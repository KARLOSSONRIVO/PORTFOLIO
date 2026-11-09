import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root=process.cwd();
const archive=path.resolve("assets/PROJECTS");
const output=path.resolve("public/projects/gallery");
const backup=path.resolve(".taste-skill/png-originals");
const slug=value=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
async function files(directory){
  const result=[];
  for(const entry of await fs.readdir(directory,{withFileTypes:true})){
    const file=path.join(directory,entry.name);
    if(entry.isDirectory())result.push(...await files(file));else result.push(file);
  }
  return result;
}
async function encode(input){
  const source=sharp(input);
  const metadata=await source.metadata();
  if(metadata.format==="jpeg")return {buffer:await source.webp({quality:88,effort:6}).toBuffer(),width:metadata.width,height:metadata.height};
  const [lossless,nearLossless]=await Promise.all([
    source.clone().webp({lossless:true,effort:6}).toBuffer(),
    source.clone().webp({nearLossless:true,quality:90,effort:6}).toBuffer(),
  ]);
  return {buffer:lossless.length<=nearLossless.length?lossless:nearLossless,width:metadata.width,height:metadata.height};
}

await fs.mkdir(output,{recursive:true});
const gallery=[];
let galleryOriginal=0,galleryOptimized=0;
for(const file of (await files(archive)).filter(file=>/\.(png|jpe?g)$/i.test(file)).sort()){
  const relative=path.relative(archive,file).split(path.sep);
  const name=relative.map(part=>slug(part.replace(/\.(png|jpe?g)$/i,""))).join("--")+".webp";
  const result=await encode(file);
  await fs.writeFile(path.join(output,name),result.buffer);
  const thumbnail=name.replace(/\.webp$/,".thumb.webp");
  await sharp(file).resize({width:680,height:420,fit:"inside",withoutEnlargement:true}).webp({quality:78,effort:6}).toFile(path.join(output,thumbnail));
  const originalBytes=(await fs.stat(file)).size;
  galleryOriginal+=originalBytes;galleryOptimized+=result.buffer.length;
  gallery.push({project:relative[0],src:`/projects/gallery/${name}`,thumbnail:`/projects/gallery/${thumbnail}`,width:result.width,height:result.height,originalBytes,bytes:result.buffer.length});
}
await fs.writeFile(path.join(output,"manifest.json"),JSON.stringify({images:gallery,originalBytes:galleryOriginal,bytes:galleryOptimized},null,2));
await fs.writeFile("src/lib/projectGallery.ts",`// Generated from assets/PROJECTS by scripts/optimize-portfolio-images.mjs.\nexport const projectGallery = ${JSON.stringify(gallery.map(({project,src,thumbnail,width,height})=>({project,src,thumbnail,width,height})),null,2)} as const;\n`);

// Keep source originals privately; deploy the smaller WebP image instead.
const previous=await fs.readFile("public/projects/image-optimization.json","utf8").then(JSON.parse).catch(()=>null);
const replacements=[];
let publicOriginal=previous?.displayImages.originalBytes??0,publicOptimized=previous?.displayImages.bytes??0;
for(const file of (await files(path.resolve("public"))).filter(file=>/\.png$/i.test(file)&&!file.includes(`${path.sep}certificates${path.sep}original${path.sep}`))){
  const result=await encode(file);
  const target=file.replace(/\.png$/i,".webp");
  const old=await fs.readFile(file);
  const originalPath=path.join(backup,path.relative(root,file));
  await fs.mkdir(path.dirname(originalPath),{recursive:true});
  await fs.writeFile(originalPath,old);
  await fs.writeFile(target,result.buffer);
  replacements.push({from:"/"+path.relative(path.resolve("public"),file).split(path.sep).join("/"),to:"/"+path.relative(path.resolve("public"),target).split(path.sep).join("/")});
  publicOriginal+=old.length;publicOptimized+=result.buffer.length;
}
const textExtensions=/\.(?:tsx?|jsx?|mjs|css|html|json)$/i;
for(const file of [...await files(path.resolve("src")),...await files(path.resolve("public"))].filter(file=>textExtensions.test(file))){
  let text=await fs.readFile(file,"utf8");
  const original=text;
  for(const {from,to} of replacements){
    text=text.split(from).join(to);
    // Standalone samples resolve art paths relative to their document directory.
    if(file.startsWith(path.resolve("public/project-samples"))){
      text=text.split(from.replace("/project-samples/","")).join(to.replace("/project-samples/",""));
      text=text.split(from.replace("/projects/","../projects/")).join(to.replace("/projects/","../projects/"));
    }
  }
  if(text!==original)await fs.writeFile(file,text);
}
// Imported project screenshots become public assets; preserve the original source PNGs.
for(const file of (await files(path.resolve("src/app/images"))).filter(file=>/\.png$/i.test(file))){
  const result=await encode(file);
  const name=slug(path.basename(file,".png"))+".webp";
  const target=path.resolve("public/projects/images",name);
  await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,result.buffer);
  const imported="@/"+path.relative(path.resolve("src"),file).split(path.sep).join("/");
  for(const sourceFile of (await files(path.resolve("src/app/projects"))).filter(f=>/\.tsx$/.test(f))){
    let text=await fs.readFile(sourceFile,"utf8");
    text=text.replace(new RegExp(`import (\\w+) from ["']${imported.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}["'];?`),(_,name)=>`const ${name} = "/projects/images/${slug(path.basename(file,".png"))}.webp";`);
    text=text.replace(/src=\{(\w+Img)\.src\}/g,"src={$1}");
    await fs.writeFile(sourceFile,text);
  }
}
const allReplacements=[...(previous?.replacements??[]),...replacements].filter((item,index,items)=>items.findIndex(other=>other.from===item.from)===index);
await fs.writeFile(path.resolve("public/projects/image-optimization.json"),JSON.stringify({gallery:{count:gallery.length,originalBytes:galleryOriginal,bytes:galleryOptimized},displayImages:{count:allReplacements.length,originalBytes:publicOriginal,bytes:publicOptimized},replacements:allReplacements},null,2));
// Remove only converted public PNGs after every destination and reference is written.
for(const {from}of replacements)await fs.unlink(path.resolve("public","."+from));
console.log(JSON.stringify({gallery:{count:gallery.length,before:galleryOriginal,after:galleryOptimized},displayImages:{count:allReplacements.length,before:publicOriginal,after:publicOptimized}}));
