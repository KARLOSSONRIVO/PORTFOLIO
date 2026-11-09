// Original HOMEPAGE.js menu toggle, with keyboard state and preview-only navigation.
const menu=document.querySelector(".menu");
const toggle=document.querySelector(".toggle");
const video=document.querySelector("video");
const motion=document.getElementById("paldex-motion");
const notice=document.querySelector(".paldex-notice");
function syncMenu(){
  const open=menu.classList.contains("active");
  toggle.setAttribute("aria-expanded",String(open));
  toggle.setAttribute("aria-label",`${open?"Close":"Open"} element menu`);
  menu.querySelectorAll("li a").forEach(link=>link.tabIndex=open?0:-1);
}
toggle.addEventListener("click",()=>{menu.classList.toggle("active");syncMenu();});
document.querySelector(".map a").tabIndex=0;
document.querySelectorAll("[data-preview-destination]").forEach(link=>link.addEventListener("click",event=>{
  event.preventDefault();
  if(link.dataset.previewDestination==="Home"){menu.classList.remove("active");syncMenu();notice.hidden=true;return;}
  notice.textContent=`${link.dataset.previewDestination}: this sample shows the original home design. Creature and map pages stay outside the preview.`;
  notice.hidden=false;
}));
function syncPlayback(){motion.textContent=video.paused?"Play background":"Pause background";motion.setAttribute("aria-pressed",String(!video.paused));}
motion.addEventListener("click",()=>{if(video.paused)video.play().catch(()=>{});else video.pause();});
video.addEventListener("play",syncPlayback);video.addEventListener("pause",syncPlayback);
if(!matchMedia("(prefers-reduced-motion: reduce)").matches)video.play().catch(()=>{});
document.addEventListener("visibilitychange",()=>{if(document.hidden)video.pause();});
