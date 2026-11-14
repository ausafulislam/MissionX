import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { STARTERS, PARTS } from '../data/catalog';
import { simulate } from '../engine/simulation';
import { buildMissionReport, reportFilename } from './mission-report';
import { createMissionPdf } from './pdf-export';
import type { SavedRun, Design } from '../types';
for (const missionId of ['moon', 'sun', 'mars'] as const)
    test(`${missionId} report includes every selected component and actual data; PDF is multipage`, async () => {
        const design: Design = { missionId, partIds: [...STARTERS[missionId]], orbitId: missionId === 'moon' ? 'lunar' : missionId === 'sun' ? 'solar' : 'mars', rocketId: missionId === 'moon' ? 'swift' : missionId === 'sun' ? 'atlas' : 'horizon' };
        const run: SavedRun = { id: 'report', createdAt: '2026-11-14T00:00:00Z', commanderName: 'Commander / Test', diagnosticsReviewed: 6, design, result: simulate(design, 2026) };
        const report = buildMissionReport(run), text = JSON.stringify(report);
        assert.equal(report.length, 13);
        for (const id of design.partIds)
            assert.ok(text.includes(PARTS.find(p => p.id === id)!.name));
        assert.ok(text.includes(String(run.result.science)));
        assert.ok(text.includes('Not recorded'));
        assert.ok(text.includes('not separately scored'));
        assert.match(reportFilename(run), /^MissionX_[\w.-]+\.pdf$/);
        const bytes = await createMissionPdf(run);
        const pdf = await PDFDocument.load(bytes);
        assert.ok(pdf.getPageCount() > 2);
        const long = { ...run, commanderName: 'X'.repeat(500) };
        assert.ok((await createMissionPdf(long)).length > 1000);
    });
test('maximum catalog table, unknown optional metadata and failed flight export remain valid', async () => {
    const design: Design = { missionId: 'moon', partIds: PARTS.map(p => p.id), orbitId: 'lunar', rocketId: 'swift' };
    const run: SavedRun = { id: 'max', createdAt: '2026-11-14T00:00:00Z', design, result: simulate(design, 1), commanderName: 'A'.repeat(500) };
    assert.equal(run.result.outcome, 'failed');
    const sections = buildMissionReport(run);
    assert.equal(sections[3].rows.length, PARTS.length + 1);
    assert.ok(reportFilename(run).length < 181);
    assert.ok(reportFilename(run).endsWith('.pdf'));
    const pdf = await PDFDocument.load(await createMissionPdf(run));
    assert.ok(pdf.getPageCount() > 3);
});
