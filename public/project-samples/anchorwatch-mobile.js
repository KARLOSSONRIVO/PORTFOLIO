// Local dashboard controls only. No Flutter services, APIs or persistence.
document.getElementById("aw-period").addEventListener("change",event=>{
  document.querySelectorAll("[data-period-panel]").forEach(panel=>panel.hidden=panel.dataset.periodPanel!==event.target.value);
});
document.querySelectorAll("[data-summary-toggle]").forEach(button=>button.addEventListener("click",()=>{
  const summary=button.closest(".aw-summary");
  const open=button.getAttribute("aria-expanded")==="true";
  button.setAttribute("aria-expanded",String(!open));
  button.textContent=open?"Generate":"Hide";
  summary.querySelector("[data-summary-prompt]").hidden=!open;
  summary.querySelector("[data-summary-result]").hidden=open;
}));
const drawer=document.getElementById("aw-drawer");
const opener=document.getElementById("aw-drawer-open");
function closeDrawer(){drawer.hidden=true;opener.setAttribute("aria-expanded","false");opener.focus();}
opener.addEventListener("click",()=>{drawer.hidden=false;opener.setAttribute("aria-expanded","true");document.getElementById("aw-drawer-close").focus();});
document.getElementById("aw-drawer-close").addEventListener("click",closeDrawer);
document.getElementById("aw-home").addEventListener("click",closeDrawer);
drawer.addEventListener("click",event=>{if(event.target===drawer)closeDrawer();});
drawer.addEventListener("keydown",event=>{
  if(event.key==="Escape"){event.stopPropagation();closeDrawer();}
  if(event.key!=="Tab")return;
  const buttons=[...drawer.querySelectorAll("button")];
  if(event.shiftKey&&document.activeElement===buttons[0]){event.preventDefault();buttons.at(-1).focus();}
  if(!event.shiftKey&&document.activeElement===buttons.at(-1)){event.preventDefault();buttons[0].focus();}
});
document.querySelectorAll("[data-preview-action]").forEach(button=>button.addEventListener("click",()=>{
  const notice=document.querySelector(".aw-notice");
  notice.textContent=`${button.dataset.previewAction} is outside this dashboard sample. All displayed records are fictional.`;
  notice.hidden=false;
}));
