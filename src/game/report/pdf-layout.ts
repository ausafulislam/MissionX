import { PDFDocument, PDFFont, PDFPage, PDFString, rgb } from 'pdf-lib';
export const MISSIONX_URL='https://missionx-black.vercel.app/';
const INK=rgb(.08,.08,.1), ORANGE=rgb(1,.416,.169), RULE=rgb(.83,.83,.85);
const ascii=(s:string)=>s.replace(/[–—−]/g,'-').replace(/×/g,'x').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[^\x20-\x7e]/g,'?');
/** Width-based wrapping, including long tokens; no guessed character counts. */
export function wrapPdfText(value:string,width:number,measure:(s:string)=>number):string[]{
 const lines:string[]=[];
 for(const paragraph of value.split(/\r?\n/)){
  let line='';
  for(const word of paragraph.split(/\s+/).filter(Boolean)){
   if(line&&measure(line+' '+word)<=width){line+=' '+word;continue;}
   if(line){lines.push(line);line='';}
   for(const char of word){if(line&&measure(line+char)>width){lines.push(line);line='';}line+=char;}
  }
  if(line)lines.push(line);
 }
 return lines.length?lines:[''];
}
export class ReportLayout {
 page:PDFPage; y=780; section=''; headers:string[]=[]; widths:number[]=[];
 constructor(readonly pdf:PDFDocument,readonly font:PDFFont,readonly bold:PDFFont){this.page=pdf.addPage([595,842]);}
 measure(value:string,size:number,heavy=false){
  if(/[^\x20-\x7e]/.test(value)&&typeof document!=='undefined'){
   const ctx=document.createElement('canvas').getContext('2d');if(ctx){ctx.font=`${heavy?'bold ':''}${size}px sans-serif`;return ctx.measureText(value).width;}
  }
  return (heavy?this.bold:this.font).widthOfTextAtSize(ascii(value),size);
 }
 wrap(value:string,width:number,size=9,heavy=false){return wrapPdfText(value,width,s=>this.measure(s,size,heavy));}
 async draw(value:string,x:number,y:number,size=9,heavy=false,color=INK){
  if(/[^\x20-\x7e]/.test(value)&&typeof document!=='undefined'){
   const w=Math.max(1,this.measure(value,size,heavy));const canvas=document.createElement('canvas');canvas.width=Math.ceil((w+3)*3);canvas.height=Math.ceil(size*1.7*3);
   const ctx=canvas.getContext('2d');if(ctx){ctx.font=`${heavy?'bold ':''}${size*3}px sans-serif`;ctx.fillStyle='#141419';ctx.fillText(value,0,size*3);
    const image=await this.pdf.embedPng(canvas.toDataURL('image/png'));this.page.drawImage(image,{x,y:y-size*.7,width:canvas.width/3,height:canvas.height/3});return;}
  }
  this.page.drawText(ascii(value),{x,y,size,font:heavy?this.bold:this.font,color});
 }
 newPage(){this.page=this.pdf.addPage([595,842]);this.y=780;}
 async title(title:string,continued=false){
  this.page.drawRectangle({x:42,y:this.y-7,width:511,height:3,color:ORANGE});this.y-=30;
  for(const line of this.wrap(title+(continued?' / continued':''),511,17,true)){await this.draw(line,42,this.y,17,true);this.y-=23;}
  this.y-=8;
 }
 async tableHeader(){
  const height=Math.max(...this.headers.map((h,i)=>this.wrap(h,this.widths[i]-16,8,true).length))*12+14;
  this.page.drawRectangle({x:42,y:this.y-height+5,width:511,height,color:rgb(.94,.94,.95)});
  let x=42;
  for(let i=0;i<this.headers.length;i++){const lines=this.wrap(this.headers[i],this.widths[i]-16,8,true);for(let j=0;j<lines.length;j++)await this.draw(lines[j],x+8,this.y-8-j*12,8,true);x+=this.widths[i];}
  this.y-=height;
 }
 async continueTable(){this.newPage();await this.title(this.section,true);await this.tableHeader();}
 async table(title:string,rows:string[][],headers:string[],widths:number[]){
  if(!rows.length)return;
  this.newPage();this.section=title;this.headers=headers;this.widths=widths;
  await this.title(title);await this.tableHeader();
  for(const row of rows){
   const cells=headers.map((_,i)=>this.wrap(row[i]??'',widths[i]-16,8.5,i===0));
   const total=Math.max(...cells.map(c=>c.length));
   if(this.y-16-total*12<68&&total*12+16<580)await this.continueTable();
   let offset=0;
   while(offset<total){
    if(this.y<112)await this.continueTable();
    const lines=Math.min(total-offset,Math.max(1,Math.floor((this.y-68-16)/12)));
    const height=lines*12+16;
    let x=42;
    for(let col=0;col<cells.length;col++){
     for(let n=0;n<lines;n++){const text=cells[col][offset+n];if(text!==undefined)await this.draw(text,x+8,this.y-12-n*12,8.5,col===0);}
     x+=widths[col];
    }
    this.page.drawLine({start:{x:42,y:this.y-height+3},end:{x:553,y:this.y-height+3},color:RULE,thickness:.5});
    this.y-=height;offset+=lines;
    if(offset<total)await this.continueTable();
   }
  }
 }
 async coverText(value:string,size=12,heavy=false){
  for(const line of this.wrap(value,511,size,heavy)){
   if(this.y<90){this.newPage();await this.title('Mission identity / continued');}
   await this.draw(line,42,this.y,size,heavy);this.y-=size*1.45;
  }
  this.y-=12;
 }
 finish(){
  const pages=this.pdf.getPages();
  pages.forEach((page,i)=>{
   if(i>0){page.drawText('MISSIONX / MISSION REPORT',{x:42,y:813,size:7,font:this.bold,color:INK});}
   page.drawLine({start:{x:42,y:52},end:{x:553,y:52},color:RULE,thickness:.5});
   page.drawText(MISSIONX_URL,{x:42,y:37,size:8,font:this.font,color:INK});
   page.drawText(`EDUCATIONAL SIMULATION  |  ${i+1} / ${pages.length}`,{x:343,y:37,size:7,font:this.font,color:INK});
   this.link(page,42,33,this.font.widthOfTextAtSize(MISSIONX_URL,8),14);
  });
 }
 link(page:PDFPage,x:number,y:number,width:number,height:number){
  const annotation=this.pdf.context.obj({Type:'Annot',Subtype:'Link',Rect:[x,y,x+width,y+height],Border:[0,0,0],A:{S:'URI',URI:PDFString.of(MISSIONX_URL)}});
  page.node.addAnnot(this.pdf.context.register(annotation));
 }
}
