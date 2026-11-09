"use client";

import { Component, lazy, Suspense, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Inter } from "next/font/google";
import type { NativeSampleId } from "@/lib/projectSamples";

const CarbonSense = lazy(() => import("./carbonsense/Dashboard"));
const FinShield = lazy(() => import("./finshield/Sample"));
// FinShield's original app/layout.tsx loads this same family through Next.
const finShieldFont = Inter({subsets:["latin"],display:"swap"});

class SampleBoundary extends Component<{children:ReactNode}, {failed:boolean}> {
  state = {failed:false};
  static getDerivedStateFromError() { return {failed:true}; }
  render() {
    return this.state.failed
      ? <p role="alert" style={{padding:24}}>The dashboard could not load. Return to project details and try again.</p>
      : this.props.children;
  }
}

/** A document boundary for CSS isolation; the dashboard itself is native React. */
export function NativeSampleFrame({project,title,onReady}:{project:NativeSampleId;title:string;onReady:()=>void}) {
  const [mount,setMount]=useState<HTMLElement|null>(null);
  const [notice,setNotice]=useState(false);
  const frameRef=useRef<HTMLIFrameElement>(null);
  const source=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'none'"><link rel="stylesheet" href="/project-samples/${project}-native.css"></head><body><div id="dashboard-root"></div></body></html>`;

  return <>
    <iframe
      ref={frameRef}
      title={`${title} — original React dashboard with fictional data`}
      srcDoc={source}
      sandbox="allow-same-origin"
      referrerPolicy="no-referrer"
      onLoad={()=>{
        const doc=frameRef.current?.contentDocument;
        if(!doc)return;
        // Reuse the portfolio's locally loaded Geist face for the original CarbonSense UI.
        const faces=Array.from(document.styleSheets).flatMap(sheet=>{
          try{return Array.from(sheet.cssRules).filter(rule=>rule.type===CSSRule.FONT_FACE_RULE).map(rule=>rule.cssText.replace(/url\(["']?([^)'"\s]+)["']?\)/g,(_,url:string)=>`url("${new URL(url,sheet.href??location.href).href}")`));}
          catch{return [];}
        });
        const style=doc.createElement("style");
        style.textContent=faces.join("\n")+`\n:root{--font-geist-sans:${getComputedStyle(document.body).getPropertyValue("--font-geist-sans")||"Arial,sans-serif"};--font-finshield-body:${finShieldFont.style.fontFamily}}`;
        doc.head.append(style);
        doc.addEventListener("sample-navigation",()=>setNotice(true));
        // Escape reaches the existing dialog handler across the document boundary.
        doc.addEventListener("keydown",event=>{
          if(event.key==="Escape")frameRef.current?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true,cancelable:true}));
        });
        setMount(doc.getElementById("dashboard-root"));
        onReady();
      }}
    />
    {mount&&createPortal(<SampleBoundary><Suspense fallback={<p role="status" style={{padding:24}}>Loading dashboard…</p>}>
      {project==="carbonsense"?<CarbonSense/>:<FinShield/>}
    </Suspense></SampleBoundary>,mount)}
    {notice&&<div role="status" className="project-sample-notice">This preview covers the dashboard. Navigation and account actions stay in the sample.<button type="button" onClick={()=>setNotice(false)}>Dismiss</button></div>}
  </>;
}
