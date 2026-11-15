/** PDF-only derivative of the supplied artwork; run with Bun and existing Sharp. */
import sharp from "sharp";
const {data,info}=await sharp('public/images/logo.png').ensureAlpha().raw().toBuffer({resolveWithObject:true});
// Alpha projection separates the final X/swoosh at x=1530 (N ends at x=1505).
for(let i=0;i<data.length;i+=4){
 const x=(i/4)%info.width;
 const color=x>=1530?[255,106,43]:[20,20,25];
 data[i]=color[0];data[i+1]=color[1];data[i+2]=color[2];
}
await sharp(data,{raw:{width:info.width,height:info.height,channels:4}}).trim({background:'#ffffff00'}).png().toFile('public/images/logo-report.png');
