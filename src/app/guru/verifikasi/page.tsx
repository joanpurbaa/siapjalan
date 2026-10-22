"use client";
import {useState} from "react";import {useStore} from "@/lib/store";import {STATUS,TYPE} from "@/lib/data";
export default function Verify(){const {s,up,toast}=useStore();const [tab,setTab]=useState("pending_review");const [note,setNote]=useState<any>({});
 const set=(id:string,status:string)=>{if(status!=="approved"&&!(note[id]||"").trim()){toast("Catatan wajib diisi untuk revisi atau penolakan");return}if(status==="rejected"&&!confirm("Tolak peluang ini?"))return;up((x:any)=>({...x,opps:x.opps.map((o:any)=>o.id===id?{...o,status,note:note[id]||o.note}:o)}))};
 const l=s.opps.filter((o:any)=>o.status===tab);
 return <div><h1 className="text-2xl font-semibold">Verifikasi Peluang</h1>
  <div className="my-3 flex flex-wrap gap-1">{["pending_review","approved","needs_revision","rejected"].map(k=><button key={k} aria-pressed={tab===k} onClick={()=>setTab(k)} className={`rounded-full border px-3 py-1 text-sm ${tab===k?"border-brand bg-brand-soft":"bg-white"}`}>{STATUS[k]} ({s.opps.filter((o:any)=>o.status===k).length})</button>)}</div>
  {l.length?<ul className="space-y-3">{l.map((o:any)=><li key={o.id} className="card space-y-2"><div><span className="text-xs font-semibold text-brand">{TYPE[o.type]}</span><h2 className="font-semibold">{o.title}</h2><p className="text-sm text-slate-600">{o.org} · {o.loc} · {o.skills.join(", ")}</p></div>
   {tab==="pending_review"&&<><input aria-label="Catatan" className="inp" placeholder="Catatan untuk industri (wajib untuk revisi/tolak)" onChange={e=>setNote({...note,[o.id]:e.target.value})}/>
   <div className="flex flex-wrap gap-2"><button className="btn" onClick={()=>set(o.id,"approved")}>Setujui</button><button className="btn2" onClick={()=>set(o.id,"needs_revision")}>Minta Revisi</button><button className="btn2 !text-red-700" onClick={()=>set(o.id,"rejected")}>Tolak</button></div></>}</li>)}</ul>:<div className="card text-sm">Tidak ada peluang pada status ini.</div>}</div>}
