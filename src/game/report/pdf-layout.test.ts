import {readFile} from 'node:fs/promises';
import {test} from 'node:test';import assert from 'node:assert/strict';import {PDFDocument,PDFName,PDFDict,PDFArray,PDFString,StandardFonts} from 'pdf-lib';
import {wrapPdfText,MISSIONX_URL} from './pdf-layout';import {createMissionPdf} from './pdf-export';import {STARTERS} from '../data/catalog';import {simulate} from '../engine/simulation';import type {Design,SavedRun} from '../types';
test('measured wrapping includes long URLs without clipping or dropping characters',async()=>{
 const pdf=await PDFDocument.create(),font=await pdf.embedFont(StandardFonts.Helvetica);
 for(const value of ['https://missionx-black.vercel.app/'+ 'long'.repeat(150),'Maximum component specifications and detailed findings '.repeat(30)]){
  const lines=wrapPdfText(value,211,s=>font.widthOfTextAtSize(s,8.5));assert.ok(lines.length>1);assert.ok(lines.every(l=>font.widthOfTextAtSize(l,8.5)<=211+.01));assert.equal(lines.join('').replace(/\s/g,''),value.replace(/\s/g,''));
 }
});
test('all report pages carry the exact clickable MissionX URL, with real logo and metadata',async()=>{
 const design:Design={missionId:'moon',partIds:STARTERS.moon,rocketId:'swift',orbitId:'lunar'};const run:SavedRun={id:'pdf-layout',commanderName:'A'.repeat(500),createdAt:'2026-11-14T00:00:00Z',design,result:simulate(design,1)};
 const logo=new Uint8Array(await readFile('public/images/logo-report.png'));
 const pdf=await PDFDocument.load(await createMissionPdf(run,logo,new Date('2026-11-14T00:00:00Z')));
 assert.ok(pdf.getPageCount()>=9);assert.ok(pdf.getPageCount()<40);
 for(const page of pdf.getPages()){
  const annots=page.node.lookup(PDFName.of('Annots'),PDFArray);assert.ok(annots.size()>=1);
  const link=annots.lookup(annots.size()-1,PDFDict),action=link.lookup(PDFName.of('A'),PDFDict),uri=action.lookup(PDFName.of('URI'),PDFString);
  assert.equal(uri.decodeText(),MISSIONX_URL);
 }
 assert.ok(pdf.getTitle()?.includes('Mission Report'));assert.equal(pdf.getCreationDate()?.toISOString(),'2026-11-14T00:00:00.000Z');
});
