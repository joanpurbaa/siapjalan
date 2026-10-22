"use client";
import {useState} from "react";import {useStore} from "@/lib/store";import {STATUS,TYPE} from "@/lib/data";
const ORG="PT Nusa Digital Kreatif";
export default function Add(){const {s,up}=useStore();const [e,setE]=useState<any>({});const [ok,setOk]=useState(false);
 const submit=(ev:any)=>{ev.preventDefault();const d=Object.fromEntries(new FormData(ev.target)) as any;const err:any={};
  if(!d.title?.trim())err.title="Judul wajib diisi";if(!d.desc?.trim())err.desc="Deskripsi wajib diisi";if(!d.skills?.trim())err.skills="Isi minimal satu skill";setE(err);if(Object.keys(err).length)return;
  up((x:any)=>({...x,opps:[{id:"o"+Date.now(),title:d.title,org:ORG,type:d.type,loc:d.loc||"Bandung",deadline:d.deadline,grade:d.grade,skills:d.skills.split(",").map((k:string)=>k.trim()).filter(Boolean),status:"pending_review",desc:d.desc,note:"",created:new Date().toISOString().slice(0,10)},...x.opps]}));ev.target.reset();setOk(true)};
 const mine=s.opps.filter((o:any)=>o.org===ORG);
 const F=(n:string,l:string,p:any={})=><label className="block text-sm font-medium">{l}<input name={n} className="inp mt-1 font-normal" {...p}/>{e[n]&&<span role="alert" className="text-xs text-red-700">{e[n]}</span>}</label>;
 return <div className="grid gap-6 md:grid-cols-2"><form onSubmit={submit} className="card space-y-3" noValidate><h1 className="text-xl font-semibold">Tambah Peluang</h1>
  {ok&&<p role="status" className="rounded-lg bg-brand-soft p-2 text-sm">Terkirim. Peluang belum publik sampai diverifikasi Guru/BKK.</p>}
  {F("title","Judul")}<label className="block text-sm font-medium">Jenis<select name="type" className="inp mt-1 font-normal">{Object.entries(TYPE).map(([k,v]:any)=><option key={k} value={k}>{v}</option>)}</select></label>
  {F("desc","Deskripsi singkat")}{F("skills","Skill (pisahkan koma)")}{F("loc","Lokasi / remote")}
  <label className="block text-sm font-medium">Jenjang<select name="grade" className="inp mt-1 font-normal"><option>SMK</option><option>SMA/SMK</option><option>Lulusan</option></select></label>{F("deadline","Deadline",{type:"date"})}
  <button className="btn w-full sm:w-auto">Ajukan untuk verifikasi</button></form>
  <section><h2 className="mb-2 font-semibold">Pengajuan saya</h2><ul className="space-y-2">{mine.map((o:any)=><li key={o.id} className="card text-sm"><div className="flex justify-between gap-2"><b>{o.title}</b><span className="tag">{STATUS[o.status]}</span></div>{o.note&&<p className="mt-1 text-slate-600">Catatan BKK: {o.note}</p>}
   {o.status==="needs_revision"&&<button className="btn mt-2" onClick={()=>up((x:any)=>({...x,opps:x.opps.map((p:any)=>p.id===o.id?{...p,status:"pending_review"}:p)}))}>Ajukan ulang</button>}</li>)}</ul></section></div>}
