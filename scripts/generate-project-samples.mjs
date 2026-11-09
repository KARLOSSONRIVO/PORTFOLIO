import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as icons from "lucide-react";
import {generatePaldex} from "./project-samples/paldex.mjs";
import {generateAnchorWatchMobile} from "./project-samples/anchorwatch-mobile.mjs";

// Read-only access to project assets. Never import, build, or start a project.
const output = resolve("public/project-samples");
await mkdir(output, { recursive: true });
const copies = [
  ["PROJECTS/DaguConnectAndroid/app/src/main/res/font/poppins_regular.ttf", "assets/poppins-regular.ttf"],
  ["PROJECTS/DaguConnectAndroid/app/src/main/res/font/poppins_semibold.ttf", "assets/poppins-semibold.ttf"],
  ["PROJECTS/UCASH/UCASH/src/UCASH IMAGES/LOGO AND BG/UCASHLOGO.png", "assets/ucash-logo.png"],
  ["PROJECTS/UCASH/UCASH/src/UCASH IMAGES/LOGO AND BG/BACKGROUND.png", "assets/ucash-background.png"],
  ["PROJECTS/UCASH/UCASH/src/UCASH IMAGES/BUTTONS/Add Expenses OPEN.png", "assets/ucash-add.png"],
  ["PROJECTS/UCASH/UCASH/src/UCASH IMAGES/BUTTONS/Expense History OPEN.png", "assets/ucash-history.png"],
  ["PROJECTS/UCASH/UCASH/src/UCASH IMAGES/BUTTONS/Exit OPEN.png", "assets/ucash-exit.png"],
];
for (const [from, to] of copies) await copyFile(resolve(from), resolve(output, to));

const icon = (name, size = 18) => renderToStaticMarkup(createElement(icons[name] ?? icons.Circle, { size, "aria-hidden": true, strokeWidth: 1.7 }));
const esc = text => String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const money = value => `₱${value.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const sum = values => values.reduce((total, value) => total + value, 0);
const tag = (text, tone = "good") => `<span class="tag ${tone}">${esc(text)}</span>`;
const button = (text, glyph, hint = "This sample includes the dashboard only.") => `<button type="button" class="action" data-hint="${esc(hint)}">${glyph ? icon(glyph) : ""}${text}</button>`;
const search = (label = "Search records") => `<label class="search">${icon("Search")}<input data-search type="search" placeholder="${esc(label)}" aria-label="${esc(label)}"></label>`;
const metric = (name, value, note) => `<article class="metric"><p>${name}</p><strong>${value}</strong><small>${note}</small></article>`;
const panel = (title, content, sub = "", action = "") => `<section class="panel"><header class="panel-head"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${action}</header>${content}</section>`;
const table = (headers, rows) => `<div class="table-scroll"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr data-searchable data-search-text="${esc(row.map(cell=>cell.replace(/<[^>]*>/g, "")).join(" "))}">${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="empty-search" hidden>No sample records match your search.</p>`;
function lineChart(values, labels, unit, title) {
  const max = Math.ceil(Math.max(...values) * 1.15);
  const points = values.map((v, i) => `${52 + i * (616 / (values.length - 1))},${170 - v / max * 138}`).join(" ");
  return `<svg class="line-chart" viewBox="0 0 720 214" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${[0,1,2,3].map(i=>`<line x1="52" x2="680" y1="${32+i*46}" y2="${32+i*46}" class="chart-rule"/><text x="42" y="${36+i*46}" text-anchor="end">${Math.round(max*(1-i/3))}${unit}</text>`).join("")}<polyline points="${points}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${values.map((v,i)=>`<circle cx="${52+i*616/(values.length-1)}" cy="${170-v/max*138}" r="4" fill="var(--accent)"/><text x="${52+i*616/(values.length-1)}" y="202" text-anchor="middle">${labels[i]}</text>`).join("")}</svg>`;
}
function bars(values, labels) {
  const max = Math.max(...values) * 1.1;
  return `<div class="bars" role="img" aria-label="${esc(labels.map((label,i)=>`${label}: ${values[i]}`).join(", "))}">${values.map((value,i)=>`<div class="bar-column"><span>${value}</span><div class="bar-track"><i style="height:${value/max*100}%"></i></div><small>${labels[i]}</small></div>`).join("")}</div>`;
}
function shell({name,brand,nav,body,theme="",subtitle="Dashboard"}) {
  return `<div class="workspace ${theme}"><aside class="sidebar"><div class="brand"><img src="../projects/logos/${brand}" alt=""><strong>${name}</strong></div><p class="workspace-label">SAMPLE WORKSPACE</p><nav aria-label="${name} sample navigation">${nav.map(([label,glyph],i)=>`<span class="nav-item ${i===0?"selected":""}" ${i===0?'aria-current="page"':'aria-disabled="true"'}>${icon(glyph)}${label}</span>`).join("")}</nav><div class="sidebar-person"><span class="avatar">AS</span><div><b>Alex Santos</b><small>Demo account</small></div></div></aside><div class="workspace-main"><div class="topbar"><span>${name} <span class="muted">/ ${subtitle}</span></span><div class="topbar-right">${icon("Bell")}<span class="avatar small">AS</span></div></div><main>${body}</main></div></div>`;
}
const pageHeader = (title, description, controls = "") => `<header class="page-heading"><div><h1>${title}</h1><p>${description}</p></div><div class="heading-controls">${controls}</div></header>`;
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const bookingCounts = [18,24,21,29,34,31,27];
const daguWeb = shell({name:"DaguConnect",brand:"daguconnect.png",theme:"dagu-web",nav:[["Dashboard","LayoutDashboard"],["User Management","Users"],["Bookings","CalendarDays"],["Ratings","Star"],["Payments","Wallet"],["Reports","Flag"]],body:`
 ${pageHeader("Dashboard Overview","Monday, November 9, 2026",search("Search bookings"))}
 <section class="dagu-welcome"><span class="avatar large">AS</span><div><h2>Good morning, Alex!</h2><p>Here is your service marketplace at a glance.</p></div>${button("View reports","ArrowUpRight")}</section>
 <div class="metrics four">${metric("Total users","1,284","Clients and tradespeople")}${metric("Active users","936","Active in the sample period")}${metric("Total bookings",sum(bookingCounts),"This week's service requests")}${metric("Average rating","4.8 <em>/ 5</em>","From 96 sample reviews")}</div>
 <div class="columns two-one">${panel("Bookings this week",bars(bookingCounts,days),"Sample daily service requests")}${panel("Booking status",`<div class="status-total"><strong>${sum(bookingCounts)}</strong><span>Total bookings</span></div><div class="queue-row"><span>Completed</span><b>148</b></div><div class="queue-row"><span>Pending</span><b>24</b></div><div class="queue-row"><span>Cancelled</span><b>12</b></div>`)}</div>
 ${panel("Recent bookings",table(["Booking","Client","Service","Tradesperson","Status"],[["BK-0241","Maya Cruz","Plumbing","Adrian Ramos",tag("Confirmed")],["BK-0242","Noah Reyes","Electrical","Bea Mendoza",tag("Pending","warn")],["BK-0243","Lia Torres","Air-con repair","Marco Santos",tag("Completed")]]),"Fictional requests from the sample workspace")}`});
if(sum(bookingCounts)!==148+24+12)throw Error("Booking totals must reconcile");

const transfers=[1.24,1.58,1.42,1.91,2.12,1.83,2.28];
const anchorwatch=shell({name:"AnchorWatch",brand:"anchorwatch.png",theme:"anchorwatch",nav:[["Dashboard","LayoutDashboard"],["Analytics","ChartNoAxesCombined"],["Users","Users"],["Feedback","MessagesSquare"],["Monitoring","Activity"],["Settings","Settings"]],body:`
 ${pageHeader("Dashboard","Stablecoin activity and macro indicators · sample snapshot",button("Refresh","RefreshCw","The fictional dashboard snapshot is already up to date."))}
 <div class="market-strip"><span>${icon("Globe")}United States</span><span>Sample period: November 2–8, 2026</span>${tag("Fictional market data","neutral")}</div>
 <div class="metrics three">${metric("Total USDC stablecoin volume",`$${sum(transfers).toFixed(2)}M`,"Across the seven sample days")}${metric("Avg. transaction value","$1,420","Sample transaction distribution")}${metric("Inflation indicator","2.4%","Illustrative annual rate · United States")}</div>
 <div class="columns two-one">${panel("USDC stablecoin volume",lineChart(transfers,days,"M","Illustrative daily USDC volume in millions"),"Sample daily volume · USD millions")}${panel("AI financial summary",`<div class="insight-icon">${icon("BrainCircuit",26)}</div><h3>Activity picked up at the end of the week.</h3><p class="muted reading">Sample volume rose from $1.24M on Monday to $2.28M on Sunday. The largest daily increase was on Thursday.</p><span class="caption muted">Written for this fictional dataset.</span>`)}</div>
 ${panel("Stablecoin overview",table(["Asset","Price","Sample volume","Market share"],[["<b>USDC</b> · USD Coin","$1.0001","$12.38M","48.4%"],["<b>USDT</b> · Tether","$0.9999","$10.24M","40.0%"],["<b>DAI</b> · Dai","$1.0000","$2.98M","11.6%"]]),"Illustrative values only")}`});

const statusbar=`<div class="statusbar"><b>9:41</b><span>${icon("Signal",14)}${icon("Wifi",14)}${icon("BatteryFull",18)}</span></div>`;
const mobileNav=items=>`<nav class="mobile-nav" aria-label="Sample app navigation">${items.map(([name,glyph],i)=>`<span ${i===0?'aria-current="page"':'aria-disabled="true"'}>${icon(glyph,21)}<small>${name}</small></span>`).join("")}</nav>`;
const providers=[["AR","Adrian Ramos","Plumbing","4.9","₱350 / visit"],["BM","Bea Mendoza","Electrical","4.8","₱400 / visit"],["MS","Marco Santos","Air-con repair","4.9","₱500 / visit"]];
const daguMobile=`<div class="mobile-app dagu-mobile">${statusbar}<header class="dagu-mobile-header"><div><p>Hello Alex,</p><h1>Welcome back!</h1></div><button class="icon-button" data-hint="No new notifications in this sample." aria-label="Notifications">${icon("Bell",25)}</button></header><main class="mobile-content"><p class="location">${icon("MapPin",16)}Dagupan City, Pangasinan</p>${search("Find a tradesperson")}<h2>What service do you need?</h2><div class="service-grid">${[["Plumbing","Wrench"],["Electrical","Zap"],["Air-con","Snowflake"],["Carpentry","Hammer"]].map(([name,glyph])=>`<button type="button" data-service="${name}"><span>${icon(glyph,25)}</span><small>${name}</small></button>`).join("")}</div><section class="service-callout"><div><h3>Help for every home.</h3><p>Find skilled people for your next repair.</p></div>${icon("House",52)}</section><div class="section-row"><h2>Recommended tradespeople</h2><span>Near you</span></div><div class="provider-list">${providers.map(([initials,name,skill,rating,price])=>`<article class="provider" data-searchable data-search-text="${name} ${skill}"><span class="avatar provider-avatar">${initials}</span><div><h3>${name}</h3><p>${skill}</p><small>${icon("Star",12)}${rating} · Dagupan</small></div><b>${price}</b></article>`).join("")}</div><p class="empty-search" hidden>No sample tradespeople match your search.</p></main>${mobileNav([["Home","House"],["Bookings","CalendarDays"],["Messages","MessagesSquare"],["Account","UserRound"]])}</div>`;

const notes=[
 ["IT","REST API essentials","HTTP methods, status codes, and the shape of a good endpoint.","Today · 10:20 AM","note-lilac"],
 ["DB","Database normalization","A quick guide to first, second, and third normal form.","Yesterday · 4:30 PM","note-yellow"],
 ["UX","Interface design checklist","Clear hierarchy, accessible contrast, and useful feedback.","Nov 6 · 9:15 AM","note-peach"],
 ["KT","Kotlin study notes","Null safety, data classes, and coroutines at a glance.","Nov 5 · 2:40 PM","note-mint"],
];
const sendNotes=`<div class="mobile-app send-notes">${statusbar}<header class="notes-header"><div class="brand"><img src="../projects/logos/send-notes.png" alt=""><div><h1>Send Notes</h1><p>A little clarity for your day.</p></div></div><span class="avatar">AS</span></header><main class="mobile-content">${search("Search here")}<div class="notes-filter" role="group" aria-label="Sample content type"><button class="selected" data-note-filter="all" aria-pressed="true">All</button><button data-note-filter="notes" aria-pressed="false">My notes</button><button data-note-filter="flashcards" aria-pressed="false">Flashcards</button></div><div class="section-row"><h2>Recently opened</h2><span>4 notes</span></div><div class="notes-list">${notes.map(([initial,title,body,date,tint])=>`<article class="note ${tint}" data-note-kind="notes" data-searchable data-search-text="${title} ${body}"><div class="note-top"><span>${initial}</span>${icon("MoreHorizontal",18)}</div><h3>${title}</h3><p>${body}</p><small>${date}</small></article>`).join("")}<article class="note note-lilac" data-note-kind="flashcards" hidden data-searchable data-search-text="Web development flashcards"><div class="note-top"><span>${icon("Layers",20)}</span><small>12 cards</small></div><h3>Web development</h3><p>What does an HTTP 201 response mean?</p><small>Created · November 7</small></article></div><p class="empty-search" hidden>No sample notes match your search.</p><button class="notes-fab" type="button" data-hint="Note editing is outside this dashboard sample." aria-label="Create a note">${icon("Plus",27)}</button></main>${mobileNav([["Home","House"],["My notes","NotebookPen"],["Flashcards","Layers"],["Settings","Settings"]])}</div>`;

const expenses=[{date:"Nov 9",title:"Lunch",category:"Food",amount:120},{date:"Nov 9",title:"Jeepney fare",category:"Transport",amount:30},{date:"Nov 9",title:"Study supplies",category:"Shopping",amount:89.5},{date:"Nov 8",title:"Groceries",category:"Food",amount:640},{date:"Nov 7",title:"Internet",category:"Utilities",amount:999}];
const today=sum(expenses.filter(e=>e.date==="Nov 9").map(e=>e.amount)), monthly=sum(expenses.map(e=>e.amount));
const ucash=`<main class="ucash"><div class="ucash-window"><img class="ucash-wordmark" src="assets/ucash-logo.png" alt="U-Cash"><div class="ucash-totals"><div><h1>TODAY'S EXPENSES</h1><strong>${money(today)}</strong></div><div><h2>MONTHLY EXPENSES</h2><strong>${money(monthly)}</strong></div></div><div class="ucash-actions"><button type="button" data-hint="Expense entry is outside this home-screen sample."><img src="assets/ucash-add.png" alt="Add expenses"></button><button type="button" data-toggle-history aria-expanded="false" aria-controls="expense-history"><img src="assets/ucash-history.png" alt="Expense history"></button><button type="button" data-hint="Use Back to details in the project modal to leave the sample."><img src="assets/ucash-exit.png" alt="Exit"></button></div><section class="ucash-history" id="expense-history" hidden><h2>Expense history</h2>${table(["Date","Description","Category","Amount"],expenses.map(e=>[e.date,e.title,e.category,money(e.amount)]))}</section><p class="ucash-caption">November 9, 2026 · Fictional expense records</p></div></main>`;

const screens=[
 ["daguconnect-desktop","DaguConnect web dashboard",daguWeb,""], ["daguconnect-mobile","DaguConnect Android home",daguMobile,"mobile-page"],
 ["anchorwatch-desktop","AnchorWatch dashboard",anchorwatch,""], ["send-notes-mobile","Send Notes Android home",sendNotes,"mobile-page"],
 ["ucash-desktop","U-Cash desktop home",ucash,"ucash-page"],
];
// Standalone non-Next samples. Next dashboards use copied React components.
for(const [file,title,body,bodyClass] of screens) {
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'none'; object-src 'none'; form-action 'none'; base-uri 'none'"><title>${title} — fictional data sample</title><link rel="stylesheet" href="sample.css"><script src="sample.js" defer></script></head><body class="${bodyClass}"><div class="sample-ribbon">${icon("FlaskConical",13)}<span>Dashboard sample · fictional data</span></div>${body}<div class="sample-toast" role="status" hidden></div></body></html>`;
  await writeFile(resolve(output,`${file}.html`),html);
}
await generatePaldex(output);
await generateAnchorWatchMobile(output,icon);
await writeFile(resolve(output,"fixtures.json"),JSON.stringify({bookingCounts,providers,expenses,today,monthly,screens:[...screens.map(s=>s[0]),"paldex-desktop","anchorwatch-mobile"]},null,2));
console.log(`Wrote ${screens.length+2} standalone sample screens. No original project was imported or started.`);
