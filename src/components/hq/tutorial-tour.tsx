"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { TUTORIAL_STEPS } from "@/game/onboarding/tutorial";
type Box = { left: number; top: number; width: number; height: number };
export function TutorialTour({ step, onStep, onExit, reduced }: {
  step: number; onStep: (n: number) => void; onExit: (completed: boolean) => void; reduced: boolean;
}) {
  const root = useRef<HTMLDivElement>(null), next = useRef<HTMLButtonElement>(null);
  const [layout, setLayout] = useState<{box: Box; left: number; top: number} | null>(null);
  const item = TUTORIAL_STEPS[step];
  useLayoutEffect(() => {
    const host = root.current?.closest(".hq-experience");
    if (!host) return;
    const previous = document.activeElement as HTMLElement | null;
    const siblings = Array.from(host.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== root.current);
    const prior = siblings.map(el => el.inert);
    siblings.forEach(el => { el.inert = true; });
    const target = host.querySelector<HTMLElement>(item.target);
    target?.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
    const measure = () => {
      const raw = target?.getBoundingClientRect();
      const r = raw ? {left:raw.left,top:raw.top,right:raw.right,bottom:raw.bottom,width:raw.width,height:raw.height} : null;
      // A target can live inside a scrolling station panel. Spotlight only its
      // visible intersection, never the dock/header behind clipped content.
      for(let parent=target?.parentElement;r&&parent&&parent!==host;parent=parent.parentElement){
        const style=getComputedStyle(parent), bounds=parent.getBoundingClientRect();
        if(/auto|scroll|hidden/.test(style.overflowY)){r.top=Math.max(r.top,bounds.top);r.bottom=Math.min(r.bottom,bounds.bottom);}
        if(/auto|scroll|hidden/.test(style.overflowX)){r.left=Math.max(r.left,bounds.left);r.right=Math.min(r.right,bounds.right);}
        r.width=Math.max(0,r.right-r.left);r.height=Math.max(0,r.bottom-r.top);
      }
      const width = window.innerWidth, height = window.innerHeight;
      const box = r ? { left: Math.max(6,r.left-5), top: Math.max(6,r.top-5), width: Math.min(r.width+10,width-12), height: Math.min(r.height+10,height-12) } : {left:width/2,top:height*.25,width:0,height:0};
      box.width = Math.max(0,Math.min(box.width,width-box.left-6));
      box.height = Math.max(0,Math.min(box.height,height-box.top-6));
      const card = root.current?.querySelector<HTMLElement>(".hq-tour-card");
      const cw = card?.offsetWidth ?? Math.min(360,width-24), ch = card?.offsetHeight ?? 260;
      let left = Math.max(12, Math.min(width-cw-12,box.left));
      let top = box.top + box.height + 14;
      if(top+ch>height-12) top=box.top-ch-14;
      if(top<12 && width>800){left=box.left>width/2?box.left-cw-18:box.left+box.width+18;top=box.top;}
      left=Math.max(12,Math.min(width-cw-12,left));top=Math.max(12,Math.min(height-ch-12,top));
      setLayout({box,left,top});
    };
    measure();next.current?.focus({preventScroll:true});
    const observer = new ResizeObserver(measure);
    if(target)observer.observe(target);
    const card=root.current?.querySelector(".hq-tour-card");if(card)observer.observe(card);
    window.addEventListener("resize",measure);document.addEventListener("scroll",measure,true);
    const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"){e.preventDefault();e.stopImmediatePropagation();onExit(false);}};
    window.addEventListener("keydown",escape,true);
    return()=>{observer.disconnect();window.removeEventListener("resize",measure);document.removeEventListener("scroll",measure,true);window.removeEventListener("keydown",escape,true);siblings.forEach((el,i)=>{el.inert=prior[i];});if(previous?.isConnected)previous.focus({preventScroll:true});};
  },[item,onExit]);
  const box=layout?.box;
  return <div ref={root} className={`hq-tour-root ${reduced?"tour-reduced":""}`}>
    {box&&<>
      <div className="hq-tour-shade" style={{inset:`0 0 auto 0`,height:box.top}}/>
      <div className="hq-tour-shade" style={{left:0,top:box.top,width:box.left,height:box.height}}/>
      <div className="hq-tour-shade" style={{left:box.left+box.width,right:0,top:box.top,height:box.height}}/>
      <div className="hq-tour-shade" style={{left:0,right:0,top:box.top+box.height,bottom:0}}/>
      <div className="hq-tour-spotlight" style={box}/>
    </>}
    <section className="hq-modal hq-tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-description"
      style={{left:layout?.left??12,top:layout?.top??12}}>
      <span className="eyebrow">Step {step+1} of {TUTORIAL_STEPS.length} / GUIDED TOUR</span>
      <div key={step} className="hq-tour-copy"><h2 id="tour-title">{item.title}</h2><p id="tour-description">{item.description}</p></div>
      <progress aria-label="Tutorial progress" value={step+1} max={TUTORIAL_STEPS.length}/>
      <div className="hq-tour-actions">
        <button className="hq-text-button" onClick={()=>onExit(false)}>Skip Tutorial</button>
        {step>0&&<button className="hq-outlined" onClick={()=>onStep(step-1)}>Back</button>}
        <button ref={next} className="button" onClick={()=>step===TUTORIAL_STEPS.length-1?onExit(true):onStep(step+1)}>{step===TUTORIAL_STEPS.length-1?"Finish":"Next"}</button>
      </div>
    </section>
  </div>;
}
