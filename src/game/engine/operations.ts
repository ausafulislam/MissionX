import {getMission,getOrbit} from '../data/catalog';
import assumptions from '../data/assumptions.json';
import type {Design,MissionEvent,OperationsReport} from '../types';
import {resources} from './resources';
/** Representative four-day EOL campaign. Energy per craft; data totals for the fleet. */
export function operate(design:Design,incident:MissionEvent|null,launched=true):OperationsReport {
 const r=resources(design),m=getMission(design.missionId),o=getOrbit(design.orbitId);
 const days=assumptions.representativeDays,totalHours=days*24,dt=o.period/assumptions.stepsPerOrbit;
 const report:OperationsReport={days,generatedGB:0,transmittedGB:0,receivedGB:0,remainingGB:0,lostGB:0,groundLostGB:0,batteryMinWh:0,brownoutHours:0,availability:0,averageDeliveredPower:0,contacts:0,samples:[],campaignGeneratedGB:0,campaignReceivedGB:0,scienceFraction:0};
 if(!launched)return report;
 let battery=r.batteryUsable,stored=0,energyDelivered=0,totalDemand=0,lastContact=false;
 report.batteryMinWh=battery;
 for(let step=0;step*dt<totalHours-1e-9;step++){
  const hour=step*dt,h=Math.min(dt,totalHours-hour),phase=((step%assumptions.stepsPerOrbit)+.5)/assumptions.stepsPerOrbit;
  const sunlight=phase>=o.eclipse;
  // Exactly one controlled anomaly per seeded campaign. Storm lasts one orbit;
  // contact outage is contiguous in day 3; instrument degradation persists after day 2.
  const storm=incident?.kind==='storm'&&hour>=48&&hour<48+o.period;
  const degraded=incident?.kind==='fault'&&hour>=48;
  const blackout=incident?.kind==='outage'&&hour>=48&&hour<48+24*(1-incident.dataFactor);
  const contact=phase>=1-o.contact&&!blackout;
  if(contact&&!lastContact)report.contacts++;
  lastContact=contact;
  const supply=sunlight?r.generation/(1-o.eclipse)*(storm?incident!.powerFactor:1):0;
  const demand=r.consumption*h,solar=supply*h;let served=demand;
  if(solar>=demand)battery=Math.min(r.batteryUsable,battery+(solar-demand)*assumptions.batteryChargeEfficiency);
  else {const deficit=demand-solar,withdraw=Math.min(battery,deficit);battery-=withdraw;served=solar+withdraw;}
  const availability=demand?Math.min(1,served/demand):1;
  energyDelivered+=served;totalDemand+=demand;
  if(availability<1-1e-9)report.brownoutHours+=h*(1-availability);
  report.batteryMinWh=Math.min(report.batteryMinWh,battery);
  const generated=r.data/24*h*availability*(degraded?incident!.dataFactor:storm?incident!.dataFactor:1);
  report.generatedGB+=generated;
  // Conservative ordering: observations must first fit in memory; no data credit for overflow.
  const accepted=Math.min(generated,Math.max(0,r.storage-stored));stored+=accepted;report.lostGB+=generated-accepted;
  const sent=contact?Math.min(stored,r.downlink/o.contact/24*h*availability):0;
  stored-=sent;report.transmittedGB+=sent;
  const received=sent*assumptions.groundReceptionEfficiency;report.receivedGB+=received;report.groundLostGB+=sent-received;
  if(step%(assumptions.stepsPerOrbit/2)===assumptions.stepsPerOrbit/2-1||hour+h>=totalHours-1e-9)report.samples.push({hour:hour+h,batteryWh:battery,storedGB:stored,generatedGB:report.generatedGB,transmittedGB:report.transmittedGB,receivedGB:report.receivedGB,contact,sunlight});
 }
 report.remainingGB=stored;report.availability=totalDemand?Math.min(1,energyDelivered/totalDemand):1;
 report.averageDeliveredPower=energyDelivered/totalHours;
 report.scienceFraction=r.data?Math.min(1,report.receivedGB/(r.data*days)):0;
 report.campaignGeneratedGB=report.generatedGB/days*m.lifetimeTarget*30;
 report.campaignReceivedGB=report.receivedGB/days*m.lifetimeTarget*30;
 return report;
}
