import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { buildMissionReport } from './mission-report';
import { ReportLayout, MISSIONX_URL } from './pdf-layout';
import { getMission } from '../data/catalog';
import { flightTestResults, testSummaryText } from '../engine/flight-tests';
import { flightLifecycle } from '../engine/flight-lifecycle';
import type { SavedRun } from '../types';
/** Actual run data, measured text wrapping and row-aware printer-friendly tables. */
export async function createMissionPdf(run:SavedRun,logo?:Uint8Array,generatedAt=new Date()) {
 const pdf=await PDFDocument.create();pdf.setTitle(`MissionX Mission Report / ${getMission(run.design.missionId).name}`);pdf.setAuthor('Team NASA WARRIORS');pdf.setCreationDate(generatedAt);
 const font=await pdf.embedFont(StandardFonts.Helvetica),bold=await pdf.embedFont(StandardFonts.HelveticaBold);
 const layout=new ReportLayout(pdf,font,bold),sections=buildMissionReport(run);
 if(logo){const image=await pdf.embedPng(logo);const width=255,height=width*image.height/image.width;layout.page.drawImage(image,{x:42,y:755-height,width,height});layout.y=715-height;}
 else layout.y=735;
 await layout.coverText('MISSION REPORT',32,true);
 await layout.coverText(getMission(run.design.missionId).name,21,true);
 await layout.coverText(`Mission type: ${flightLifecycle(run,0).destination} / ${getMission(run.design.missionId).fleet}-spacecraft science mission`,11);
 await layout.coverText(`Commander: ${run.commanderName??'Not recorded for this flight'}`,13,true);
 await layout.coverText(`RESULT: ${run.result.outcome.toUpperCase()}`,19,true);
 await layout.coverText(`Report generated: ${generatedAt.toISOString()}\nFlight ID: ${run.id}\nModel: ${run.result.modelVersion??1}\nCompletion: ${run.completedAt??'Not recorded'}`,10);
 const urlY=layout.y;await layout.coverText(MISSIONX_URL,11,true);layout.link(layout.page,42,urlY-3,layout.measure(MISSIONX_URL,11,true),16);
 await layout.coverText('Independent educational simulation. Configuration evaluations are not hardware certification. No real navigation, RF or thermal measurements are claimed.',10);
 layout.page.drawLine({start:{x:42,y:layout.y},end:{x:553,y:layout.y},thickness:3,color:rgb(1,.416,.169)});
 const pairs=(indices:number[])=>indices.flatMap(i=>sections[i].rows.map(row=>[row[0],row.slice(1).join('\n')]));
 await layout.table('01 / Mission overview',[...pairs([1]),sections[2].rows[0],sections[5].rows[0],sections[5].rows[3]],['Item','Mission information'],[155,356]);
 await layout.table('02 / Spacecraft configuration',sections[3].rows.slice(1),sections[3].rows[0],[160,135,216]);
 await layout.table('03 / Mission balance sheet',[...pairs([4]),...sections[2].rows.slice(1,4),...sections[5].rows.slice(1,3)],['Metric / check','Evaluated value, margin or warning'],[155,356]);
 await layout.table('04 / Launch and mission timeline',[
  ['Countdown / ascent','3, 2, 1 and LIFTOFF precede ascent at t=3 in compressed playback. This is the presentation schedule, not a recorded real-world launch.'],...pairs([6])
 ,sections[5].rows[4],sections[2].rows.at(-1)!],['Milestone','Actual event / modeled schedule'],[155,356]);
 const tests=flightTestResults(run,run.result.duration);
 const testRows=[['Preflight summary',tests.preflightSummary.status,testSummaryText(tests.preflightSummary)],
  ...tests.preflight.map(t=>[t.name,t.status,`${t.description}. ${t.evidence}`]),
  ['Arrival summary',tests.arrivalSummary.status,testSummaryText(tests.arrivalSummary)],
  ...tests.arrival.flatMap((t,i)=>[[t.name,t.status,t.description],
   ...t.evidence.split('\n').map((line,j)=>[tests.diagnostics[i].findings[j].name,tests.diagnostics[i].findings[j].status,line])]),
  ['Actual flight result',run.result.outcome.toUpperCase(),tests.failure?.description??run.result.segments[0].explanation]];
 await layout.table('05 / Mission test results',testRows,['Test / finding','Status','Description, evaluated result and reason'],[132,79,300]);
 await layout.table('06 / Science results and evaluation',pairs([8,9]),['Objective / segment','Result and performance explanation'],[155,356]);
 await layout.table('07 / Final assessment',pairs([10,11]),['Assessment','Findings and next attempt recommendations'],[155,356]);
 await layout.table('Sources and references',pairs([12]),['Reference','Original URL, scope and limitations'],[145,366]);
 layout.finish();return pdf.save();
}
