import {copyFile,mkdir,writeFile} from "node:fs/promises";
import {resolve} from "node:path";

// View-only translation of ANCHORWATCH_MOBILE/lib/presentation/screens/dashboard_screen.dart,
// main_navigation_screen.dart, bottom_navigation_widget.dart and app_theme.dart.
// Flutter and its services are never executed.
export async function generateAnchorWatchMobile(output,icon) {
  const source=resolve("PROJECTS/ANCHORWATCH_MOBILE/assets");
  const assets=resolve(output,"assets/anchorwatch-mobile");
  await mkdir(assets,{recursive:true});
  for(const name of ["Home","Compass","AnchorWise","Notifications","Profile"])
    await copyFile(resolve(source,`images/Navigation_Icons/${name}.png`),resolve(assets,`${name}.png`));
  await copyFile(resolve(source,"images/LOGOnoBG.png"),resolve(assets,"logo.png"));
  for(const weight of ["Regular","Medium","SemiBold","Bold"])
    await copyFile(resolve(source,`fonts/Inter_18pt-${weight}.ttf`),resolve(assets,`Inter-${weight}.ttf`));

  const rows=[
    {period:"Jun",price:1.0002,supply:60900,net:620,inflation:2.9},
    {period:"Jul",price:0.9998,supply:61700,net:800,inflation:2.8},
    {period:"Aug",price:1.0001,supply:61300,net:-400,inflation:2.7},
    {period:"Sep",price:1.0000,supply:62500,net:1200,inflation:2.6},
    {period:"Oct",price:0.9999,supply:63100,net:600,inflation:2.5},
    {period:"Nov",price:1.0001,supply:63900,net:800,inflation:2.4},
  ];
  const years=[{period:"2024",price:1.0001,supply:43800,net:7200,inflation:3.4},{period:"2025",price:0.9999,supply:58200,net:14400,inflation:3.0},{period:"2026",price:1.0001,supply:63900,net:5700,inflation:2.4}];
  const esc=value=>String(value).replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;");
  const summary=(text)=>`<div class="aw-summary"><div>${icon("ChartNoAxesCombined",18)}<strong>AI Summary</strong><button type="button" data-summary-toggle aria-expanded="false">Generate</button></div><p data-summary-prompt>Click Generate to get AI analysis for this chart</p><p data-summary-result hidden>${text} <small>Prewritten example · fictional data.</small></p></div>`;
  const card=(title,content,text)=>`<section class="aw-card"><h2>${title}</h2>${content}${summary(text)}</section>`;
  const axis=(values,label,left,right)=>`<svg class="aw-chart" viewBox="0 0 460 250" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${[0,1,2,3,4].map(i=>`<path d="M42 ${30+i*40}H415" stroke="#e5e5e5"/><text x="35" y="${34+i*40}" text-anchor="end">${left?.[i]??""}</text>${right?`<text x="422" y="${34+i*40}">${right[i]}</text>`:""}`).join("")}${values.map((r,i)=>`<text x="${50+i*355/Math.max(values.length-1,1)}" y="215" text-anchor="middle">${r.period}</text>`).join("")}`;
  const graph=(values,keys,label)=>{
    const series=key=>values.map(r=>key==="marketCap"?r.price*r.supply:r[key]);
    const bounds=key=>{const v=series(key),min=Math.min(...v),max=Math.max(...v),pad=(max-min)*.15||.01;return{min:min-pad,max:max+pad};};
    const ticks=key=>{const b=bounds(key);return [0,1,2,3,4].map(i=>{const value=b.max-(b.max-b.min)*i/4;return key==="price"?value.toFixed(4):key==="supply"||key==="marketCap"?`${(value/1000).toFixed(1)}K`:key==="inflation"?`${value.toFixed(1)}%`:value.toFixed(2);});};
    let svg=axis(values,label,ticks(keys[0][0]),keys[1]?ticks(keys[1][0]):undefined);
    for(const [key,color]of keys){
      const v=series(key),{min,max}=bounds(key);
      const points=v.map((y,i)=>`${50+i*355/Math.max(values.length-1,1)},${190-(y-min)/(max-min)*160}`).join(" ");
      svg+=`<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2"/>`;
    }
    return `<div class="aw-chart-scroll" tabindex="0" aria-label="${esc(label)} chart, scroll horizontally">${svg}</svg></div><div class="aw-legend">${keys.map(([key,color])=>`<span><i style="background:${color}"></i>${key==="marketCap"?"Market Cap":key[0].toUpperCase()+key.slice(1)}</span>`).join("")}</div>`;
  };
  const table=values=>`<div class="aw-table-scroll" tabindex="0" aria-label="Unified data table, scroll horizontally"><table><thead><tr>${["Period","Price","Supply (M)","Net Δ","Inflation %"].map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${values.map(r=>`<tr><td>${r.period}</td><td>$${r.price.toFixed(4)}</td><td>${r.supply.toLocaleString("en-US")}</td><td>${r.net>0?"+":""}${r.net.toLocaleString("en-US")}M</td><td>${r.inflation.toFixed(1)}%</td></tr>`).join("")}</tbody></table></div>`;
  const mintBurn=values=>{
    const max=Math.max(...values.map(r=>Math.abs(r.net)))*1.2;
    return `<div class="aw-chart-scroll">${axis(values,"Mint vs Burn, fictional supply changes in millions",[max.toFixed(0),(max*.75).toFixed(0),(max*.5).toFixed(0),(max*.25).toFixed(0),"0"])}${values.map((r,i)=>`<rect x="${36+i*355/Math.max(values.length-1,1)}" y="${190-Math.abs(r.net)/max*160}" width="28" height="${Math.abs(r.net)/max*160}" fill="${r.net>=0?"#69f0ae":"#ff8a80"}" rx="2"/>`).join("")}</svg></div><div class="aw-legend"><span><i style="background:#69f0ae"></i>Mint</span><span><i style="background:#ff8a80"></i>Burn</span></div>`;
  };
  const scatter=`<svg class="aw-chart aw-scatter" viewBox="0 0 320 250" role="img" aria-label="Fictional supply percentage and price percentage scatter plot"><path d="M45 20V205H300M45 65H300M45 110H300M45 155H300" fill="none" stroke="#ddd"/>${[[70,178],[109,147],[135,165],[183,102],[225,63],[280,84]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#448aff"/>`).join("")}<text x="170" y="234" text-anchor="middle">Supply % change</text><text x="15" y="110" transform="rotate(-90 15 110)" text-anchor="middle">Price % change</text></svg>`;
  const matrix=[[1,.18,.99,-.82],[.18,1,.2,-.24],[.99,.2,1,-.8],[-.82,-.24,-.8,1]];
  const heatmap=`<p class="aw-subtle">Pearson correlation · fictional series</p><div class="aw-heatmap"><span></span>${["Supply","Price","Mkt cap","Inflation"].map(v=>`<span>${v}</span>`).join("")}${matrix.map((row,i)=>`<span>${["Supply","Price","Mkt cap","Inflation"][i]}</span>${row.map(v=>`<b style="background:${v>=0?`rgba(0,188,212,${.15+Math.abs(v)*.65})`:`rgba(255,171,64,${.15+Math.abs(v)*.65})`}">${v.toFixed(2)}</b>`).join("")}`).join("")}</div>`;
  const charts=(values,period)=>`<div data-period-panel="${period}" ${period==="Yearly"?"hidden":""}>
    ${card(`Unified Table (${period})`,table(values),"The sample shows supply increasing while the price stays close to one US dollar.")}
    ${card("Price vs Market Cap",graph(values,[["price","#00bcd4"],["marketCap","#69f0ae"]],"Price and market capitalization",["1.0003","1.0002","1.0001","1.0000","0.9998"],["64K","63K","62K","61K","60K"]),"Market capitalization follows the supply trend; the sample price remains near its peg.")}
    ${card("Supply vs Inflation (Dual Axis)",graph(values,[["supply","#69f0ae"],["inflation","#ffab40"]],"Supply and inflation",["64K","63K","62K","61K","60K"],["3.0","2.8","2.6","2.4","2.2"]),"Supply rises as the illustrative inflation rate declines.")}
    ${card("Mint vs Burn (Stacked)",mintBurn(values),"Positive net changes appear as mint activity; negative changes appear as burns.")}
    ${card("Supply% vs Price% (Scatter)",scatter,"These fictional points illustrate the original scatter chart layout.")}
    ${card("Correlation Heatmap",heatmap,"The matrix is illustrative and is not a statistical claim about real market conditions.")}
    ${card("Rolling Correlation (Supply vs Market Cap)",graph(values.map((r,i)=>({...r,correlation:[.96,.98,.97,.99,.98,.99][i]})),[["correlation","#00bcd4"]],"Rolling correlation",["1.0","0.99","0.98","0.97","0.96"]),"The sample rolling correlation remains positive across the displayed periods.")}
  </div>`;
  const articles=[
    {title:"Understanding stablecoin supply and market activity",copy:"This fictional article explains how supply and market capitalization appear in the sample charts. Values and events are invented for this portfolio preview.",tag:"Stablecoins"},
    {title:"Reading macro indicators alongside digital assets",copy:"Compare the illustrative inflation series with stablecoin supply. This sample article demonstrates the original mobile card layout with local content.",tag:"Economy"},
  ];
  const nav=[["Home","Home"],["Discover","Compass"],["AnchorWise","AnchorWise"],["Alerts","Notifications"],["Profile","Profile"]];
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'none'; object-src 'none'; form-action 'none'"><title>AnchorWatch mobile dashboard — fictional data</title><link rel="stylesheet" href="anchorwatch-mobile.css"><script src="anchorwatch-mobile.js" defer></script></head><body><div class="aw-app">
    <header class="aw-appbar"><button type="button" id="aw-drawer-open" aria-label="Open navigation" aria-expanded="false" aria-controls="aw-drawer">${icon("Menu",24)}</button><h1>Dashboard</h1></header>
    <main><div class="aw-dashboard-heading"><strong>DASHBOARD</strong><select aria-label="Dashboard period" id="aw-period"><option>Monthly</option><option>Yearly</option></select></div>
    <section class="aw-card"><h2>Recent Articles</h2><div class="aw-articles" tabindex="0" aria-label="Recent fictional articles, swipe to explore">${articles.map(a=>`<article><h3>${a.title}</h3><p class="aw-subtle">Sample editorial · Nov 9, 2026</p><p>${a.copy}</p><div class="aw-article-topics"><strong>Topics:</strong><span>${a.tag}</span></div><small>Fictional article · local sample</small></article>`).join("")}</div><div class="aw-dots" aria-hidden="true"><i></i><i></i></div></section>
    ${charts(rows,"Monthly")}${charts(years,"Yearly")}</main>
    <nav class="aw-bottom-nav" aria-label="Mobile navigation">${nav.map(([label,asset],i)=>`<button type="button" aria-label="${label}" ${i===0?'aria-current="page"':'data-preview-action="'+label+'"'}><span class="aw-nav-image ${i===0?"selected":""}" style="--nav-art:url('assets/anchorwatch-mobile/${asset}.png')"></span><i></i></button>`).join("")}</nav>
    <div class="aw-drawer-backdrop" id="aw-drawer" hidden><aside aria-label="Navigation drawer"><header><img src="assets/anchorwatch-mobile/logo.png" alt=""><strong>AnchorWatch</strong><button type="button" id="aw-drawer-close" aria-label="Close navigation">${icon("X",20)}</button></header>${nav.map(([label,asset],i)=>`<button type="button" ${i===0?'id="aw-home"':'data-preview-action="'+label+'"'}><span class="aw-nav-image" style="--nav-art:url('assets/anchorwatch-mobile/${asset}.png')"></span>${i===0?"Dashboard":label}</button>`).join("")}</aside></div>
    <p class="aw-notice" role="status" hidden></p></div></body></html>`;
  await writeFile(resolve(output,"anchorwatch-mobile.html"),html);
  await writeFile(resolve(output,"assets/anchorwatch-mobile/fixtures.json"),JSON.stringify({monthly:rows,yearly:years,articles},null,2));
}
