"use client";

import {useEffect,useRef,type CSSProperties} from "react";
import Image from "next/image";
import {projectGallery} from "@/lib/projectGallery";

// Interleave projects so each strip shows a mix of the supplied screenshot archive.
const grouped=new Map<string,(typeof projectGallery[number])[]>();
for(const image of projectGallery)grouped.set(image.project,[...(grouped.get(image.project)??[]),image]);
const groups=[...grouped.values()];
const mixed=Array.from({length:Math.max(...groups.map(items=>items.length))},(_,index)=>groups.flatMap(items=>items[index]?[items[index]]:[])).flat();
const rows=Array.from({length:6},(_,row)=>mixed.filter((_,index)=>index%6===row));

export function ProjectBackground(){
  const backgroundRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const background=backgroundRef.current;
    const showcase=background?.parentElement;
    if(!background||!showcase)return;
    let visible=false;
    const sync=()=>{background.dataset.active=String(visible&&!document.hidden);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{rootMargin:"160px"});
    observer.observe(showcase);
    document.addEventListener("visibilitychange",sync);
    return()=>{observer.disconnect();document.removeEventListener("visibilitychange",sync);};
  },[]);

  return <div ref={backgroundRef} className="project-background" data-active="false" aria-hidden="true" inert>
    <div className="project-background-wall">
      {rows.map((images,index)=><div className="project-background-row" key={index}>
        <div className="project-background-track" style={{"--row-duration":`${84+index*11}s`,"--row-direction":index%2?"reverse":"normal"} as CSSProperties}>
          {[0,1].map(copy=><div className="project-background-group" key={copy}>
            {images.map(image=><div className="project-background-image" key={image.src}>
              <Image src={image.thumbnail} alt="" width={image.width} height={image.height} sizes="(max-width:600px) 220px, 340px" unoptimized loading="lazy" decoding="async" draggable={false}/>
            </div>)}
          </div>)}
        </div>
      </div>)}
    </div>
  </div>;
}
