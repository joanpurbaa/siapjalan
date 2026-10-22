"use client";
import {useState} from "react";import {useStore} from "@/lib/store";import {TYPE} from "@/lib/data";import {fit} from "@/lib/matching";import OppCard from "@/components/OppCard";
export default function Catalog(){
 const {s}=useStore();const [q,setQ]=useState("");const [t,setT]=useState("");const [sort,setSort]=useState("rel");
 let list=s.opps.filter((o:any)=>o.status==="approved"&&(!t||o.type===t)&&(`${o.title} ${o.org} ${o.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())));
 list=[...list].sort((a:any,b:any)=>sort==="rel"?fit(s.student,b).score-fit(s.student,a).score:sort==="new"?b.created.localeCompare(a.created):(a.deadline||"9").localeCompare(b.deadline||"9"));
 return <div><h1 className="text-2xl font-semibold">Jelajahi Peluang</h1>
  <div className="my-4 grid gap-2 sm:grid-cols-4">
   <input aria-label="Cari peluang" className="inp sm:col-span-2" placeholder="Cari judul, organisasi, atau skill" value={q} onChange={e=>setQ(e.target.value)}/>
   <select aria-label="Jenis" className="inp" value={t} onChange={e=>setT(e.target.value)}><option value="">Semua jenis</option>{Object.entries(TYPE).map(([k,v]:any)=><option key={k} value={k}>{v}</option>)}</select>
   <select aria-label="Urutkan" className="inp" value={sort} onChange={e=>setSort(e.target.value)}><option value="rel">Paling relevan</option><option value="new">Terbaru</option><option value="dl">Deadline terdekat</option></select></div>
  <p className="mb-3 text-sm text-slate-600">{list.length} peluang ditemukan {(q||t)&&<button className="ml-2 underline" onClick={()=>{setQ("");setT("")}}>Hapus filter</button>}</p>
  {list.length?<div className="grid gap-3 sm:grid-cols-2">{list.map((o:any)=><OppCard key={o.id} op={o}/>)}</div>:<div className="card text-center text-sm text-slate-600">Belum ada peluang yang cocok dengan filter ini.</div>}
 </div>;
}
