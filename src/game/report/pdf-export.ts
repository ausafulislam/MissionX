import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { buildMissionReport } from './mission-report';
import type { SavedRun } from '../types';
/** Paginated vector text/tables. Unicode cells use browser font rasterization, not silent transliteration. */
export async function createMissionPdf(run: SavedRun, logo?: Uint8Array) {
    const pdf = await PDFDocument.create();
    pdf.setTitle(`MissionX ${run.id}`);
    pdf.setAuthor('Team NASA WARRIORS');
    const font = await pdf.embedFont(StandardFonts.Helvetica), bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    let page = pdf.addPage([595, 842]), y = 780;
    const orange = rgb(1, .416, .169), ink = rgb(.08, .08, .1);
    const newPage = () => { page = pdf.addPage([595, 842]); y = 780; };
    if (logo) {
        const image = await pdf.embedPng(logo);
        page.drawImage(image, { x: 42, y: 790, width: 95, height: Math.min(35, 95 * image.height / image.width) });
        y = 765;
    }
    const text = async (value: string, x: number, width: number, size = 9, heavy = false) => {
        const words = value.replace(/[\r\n]+/g, ' ').split(/\s+/);
        let line = '';
        const lines: string[] = [];
        // Conservative wrap including unbroken URLs/long names.
        const max = Math.max(10, Math.floor(width / (size)));
        for (const word of words) {
            for (let i = 0; i < word.length; i += max) {
                const part = word.slice(i, i + max);
                if ((line + ' ' + part).trim().length > max) {
                    lines.push(line);
                    line = part;
                }
                else
                    line = (line + ' ' + part).trim();
            }
        }
        if (line)
            lines.push(line);
        for (const l of lines) {
            if (y < 62)
                newPage();
            if (/[^\x20-\x7e]/.test(l) && typeof document !== 'undefined') {
                const c = document.createElement('canvas');
                c.width = Math.ceil(width * 3);
                c.height = 48;
                const ctx = c.getContext('2d')!;
                ctx.font = `${heavy ? 'bold ' : ''}${size * 3}px sans-serif`;
                ctx.fillStyle = '#141419';
                ctx.fillText(l, 0, size * 3);
                const img = await pdf.embedPng(c.toDataURL('image/png'));
                page.drawImage(img, { x, y: y - 4, width: width, height: 16 });
            }
            else
                page.drawText(l.replace(/[^\x20-\x7e]/g, '?'), { x, y, size, font: heavy ? bold : font, color: ink });
            y -= 14;
        }
    };
    for (const section of buildMissionReport(run)) {
        if (y < 160)
            newPage();
        page.drawRectangle({ x: 35, y: y - 7, width: 525, height: 25, color: orange });
        await text(section.title.toUpperCase(), 43, 505, 11, true);
        y -= 18;
        for (const row of section.rows) {
            if (y < 100)
                newPage();
            await text(row[0], 43, 505, 9, true);
            await text(row.slice(1).join(' | '), 43, 505);
            y -= 10;
            page.drawLine({ start: { x: 43, y: y + 5 }, end: { x: 550, y: y + 5 }, thickness: .3, color: rgb(.8, .8, .82) });
        }
        y -= 15;
        if (section.title.startsWith('A /'))
            newPage();
    }
    const pages = pdf.getPages();
    pages.forEach((p, i) => { p.drawText(`MISSIONX | EDUCATIONAL ESTIMATES | ${i + 1} / ${pages.length}`, { x: 43, y: 30, size: 8, font, color: ink }); });
    return pdf.save();
}
