import {readFile,writeFile,copyFile,mkdir,access} from "node:fs/promises";
import {resolve,dirname} from "node:path";
import {execFile} from "node:child_process";
import {promisify} from "node:util";

const run=promisify(execFile);

/** Copies the original home HTML/CSS and referenced art; never executes the project. */
export async function generatePaldex(output) {
  const source=resolve("PROJECTS/PALDEX-WEBSITE");
  const assets=resolve(output,"assets/paldex");
  await mkdir(assets,{recursive:true});
  let html=await readFile(resolve(source,"index.html"),"utf8");
  html=html.replaceAll("\\","/");
  const images=[...new Set([...html.matchAll(/(?:src|href)="(images\/[^"<>]+)"/g)].map(match=>match[1]))];
  for(const image of images) {
    await mkdir(dirname(resolve(assets,image)),{recursive:true});
    await copyFile(resolve(source,image),resolve(assets,image));
  }
  await copyFile(resolve(source,"Home.css"),resolve(assets,"Home.css"));
  // Keep the complete original 26-second scenes, resized for an embedded preview.
  // Re-encoding avoids publishing the original pair of 64+ MB videos.
  for(const [original,name,scale] of [
    ["PaldexHomeVideo.mp4","home-desktop","1280:-2"],
    ["MobileHomeVideo.mp4","home-mobile","-2:960"],
  ]) {
    const video=resolve(assets,`${name}.mp4`);
    try {await access(video);} catch {
      await run("ffmpeg",["-hide_banner","-loglevel","error","-y","-i",resolve(source,"VIDEOS",original),"-an","-vf",`scale=${scale},fps=24`,"-c:v","libx264","-preset","fast","-crf","29","-pix_fmt","yuv420p","-movflags","+faststart",video],{maxBuffer:1024*1024});
    }
    const poster=resolve(assets,`${name}.jpg`);
    try {await access(poster);} catch {
      await run("ffmpeg",["-hide_banner","-loglevel","error","-y","-ss","1","-i",video,"-frames:v","1","-q:v","3",poster]);
    }
  }
  html=html.replace(/<head>/,'<head>\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<meta http-equiv="Content-Security-Policy" content="default-src \'self\' data:; style-src \'self\' \'unsafe-inline\'; script-src \'self\'; media-src \'self\'; connect-src \'none\'; object-src \'none\'; form-action \'none\'">');
  html=html.replace('href="Home.css"','href="assets/paldex/Home.css"><link rel="stylesheet" href="paldex-preview.css"');
  html=html.replace(/(src|href)="(images\/[^"<>]+)"/g,'$1="assets/paldex/$2"');
  // Repair the original unclosed mobile video element and use one selected source.
  html=html.replace(/  <div class="container">[\s\S]*?<section>/,`<video loop muted playsinline preload="metadata" class="bg_video" poster="assets/paldex/home-desktop.jpg" aria-label="Original PALDEX background scene"><source src="assets/paldex/home-mobile.mp4" media="(max-width:980px)" type="video/mp4"><source src="assets/paldex/home-desktop.mp4" type="video/mp4"></video><section>`);
  html=html.replace('<div class="toggle">','<button type="button" class="toggle" aria-label="Open element menu" aria-expanded="false" aria-controls="paldex-elements">').replace(/(<\/span>\s*)<\/div>/,'$1</button>');
  html=html.replace('<div class="menu">','<div class="menu" id="paldex-elements">');
  html=html.replace(/<li style="--clr:/,'<li style="--i:0;--clr:');
  html=html.replace(/<img([^>]*?)>/g,(tag,attributes)=>tag.includes('alt=')?tag:`<img${attributes} alt="">`);
  html=html.replace(/<a href="([^"]+)"/g,(_,href)=>{
    const label=href.includes("LOCATION")?"Open world map":href==="index.html"?"Home":href.split("/")[0].replace("ELECTRICS","ELECTRIC").toLowerCase();
    return `<a href="#" aria-label="${label}" data-preview-destination="${label}" tabindex="-1"`;
  });
  html=html.replace('class="LOGO"','class="LOGO" aria-label="PALDEX"');
  html=html.replace('<section>','<section><h1 class="paldex-accessible-title">PALDEX</h1>');
  html=html.replace('src="HOMEPAGE.js"','src="paldex-preview.js"');
  html=html.replace('</section>','</section><div class="paldex-tools"><span>Original PALDEX home</span><button type="button" id="paldex-motion" aria-pressed="false">Play background</button></div><p class="paldex-notice" role="status" hidden></p>');
  await writeFile(resolve(output,"paldex-desktop.html"),html);
}
