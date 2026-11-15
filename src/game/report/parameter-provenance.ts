import type { currentRunInputs } from '../engine/run-snapshot';
/** Parameter IDs are documentation identifiers, not an external-source resolver. */
export const parameterUnits: Record<string, string> = {
  mass:'kg',cost:'$M',draw:'W/spacecraft',generation:'W/spacecraft',battery:'Wh/spacecraft',
  data:'GB/day/spacecraft',downlink:'GB/day continuous contact/spacecraft',science:'points/spacecraft',
  lifetime:'months',storage:'GB/spacecraft',payloadLimit:'kg/spacecraft',fleet:'count',massLimit:'kg fleet',
  budget:'$M fleet',scienceTarget:'points fleet',lifetimeTarget:'months',capacity:'kg',reliability:'probability',
  solarFactor:'factor',eclipse:'fraction',period:'h',contact:'fraction',modelVersion:'version',
  solarAnnualRetention:'fraction/year',batteryUsableFraction:'fraction',batteryDischargeEfficiency:'fraction',
  batteryChargeEfficiency:'fraction',groundReceptionEfficiency:'fraction',representativeDays:'days',
  stepsPerOrbit:'count',advisoryMarginPercent:'%',
};
export function parameterRows(inputs: ReturnType<typeof currentRunInputs>): string[][] {
  const rows: string[][] = [];
  const add=(file:string,id:string,entry:object)=>{
    for(const [field,value] of Object.entries(entry)) if(typeof value==='number') rows.push([
      `${file}:${id}.${field}`, `${value} ${parameterUnits[field]??'dimensionless'}; authored; no external numerical source. Field mapping: docs/DATA_SOURCES.md.`
    ]);
  };
  add('missions.json',inputs.mission.id,inputs.mission);
  inputs.parts.forEach(p=>add('parts.json',p.id,p));
  add('rockets.json',inputs.rocket.id,inputs.rocket);add('orbits.json',inputs.orbit.id,inputs.orbit);
  add('assumptions.json','model',inputs.assumptions);
  return rows;
}
