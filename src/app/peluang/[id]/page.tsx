"use client";
import {useState} from "react";import Link from "next/link";import {useParams} from "next/navigation";
import {useStore} from "@/lib/store";import {TYPE} from "@/lib/data";import {fit} from "@/lib/matching";import {CheckCircle2} from "lucide-react";import {Avatar,TypeBadge,StatusBadge,dl} from "@/components/ui";import {fmt} from "@/components/OppCard";
export default function Detail(){
 const {id}=useParams();const {s,up,toast}=useStore();const [open,setOpen]=useState(false);const [msg,setMsg]=useState("");const [done,setDone]=useState(false);
 const op=s.opps.find((o:any)=>o.id===id);
 if(!op||(op.status!=="approved"&&s.role==="student"))return <div className="card">Peluang tidak ditemukan atau belum diverifikasi. <Link className="underline" href="/peluang">Kembali</Link></div>;
 const m=fit(s.student,op);const applied=s.apps.some((a:any)=>a.oppId===op.id);const sv=s.saved.includes(op.id);
 const apply=()=>{up((x:any)=>({...x,apps:[{id:"a"+Date.now(),oppId:op.id,status:"submitted",date:new Date().toISOString().slice(0,10),msg},...x.apps]}));setOpen(false);setDone(true);toast("Lamaran demo tersimpan")};
 return <div className="grid gap-4 md:grid-cols-3">
  <div className="space-y-4 md:col-span-2">
   <div className="card flex gap-3"><Avatar name={op.org} size={56} square/><div className="min-w-0"><div className="flex flex-wrap gap-1"><TypeBadge t={op.type}/><StatusBadge k={op.status}/></div><h1 className="mt-1 break-words text-2xl font-bold">{op.title}</h1><p className="text-slate-600">{op.org}</p></div></div>
   <section className="card"><h2 className="font-semibold">Gambaran umum</h2><p className="mt-1 text-sm">{op.desc}</p><div className="mt-2 flex flex-wrap gap-1">{op.skills.map((k:string)=><span key={k} className="tag">{k}</span>)}</div></section>
   <section className="card"><h2 className="font-semibold">Kenapa peluang ini cocok?</h2><p className="text-xs text-slate-500">Kecocokan kriteria {m.score}% — bukan peluang diterima.</p>
    <ul className="mt-2 space-y-1 text-sm">{m.matched.map((k:string)=><li key={k} className="text-green-700">✓ Kamu punya skill {k}</li>)}{m.missing.map((k:string)=><li key={k} className="text-amber-700">• Perlu dipelajari: {k}</li>)}
     <li className={m.gradeOk?"text-green-700":"text-amber-700"}>{m.gradeOk?"✓":"•"} Jenjang: {op.grade}</li></ul></section></div>
  <aside className="card h-fit space-y-2 text-sm"><p><b>Deadline:</b> {dl(op.deadline).label}</p><p><b>Lokasi:</b> {op.loc}</p><p><b>Pendidikan:</b> {op.grade}</p><p className="text-xs text-slate-500">Data demo</p>
   {done&&<p role="status" className="rounded-lg bg-brand-soft p-2">Lamaran demo tersimpan lokal — tidak dikirim ke perusahaan nyata.</p>}
   {applied?<Link href="/siswa/lamaran" className="btn2 w-full"><CheckCircle2 size={16} className="text-green-700"/>Sudah dilamar — lihat status</Link>:<button className="btn w-full" disabled={s.role!=="student"} onClick={()=>setOpen(true)}>Lamar (demo)</button>}{s.role!=="student"&&<p className="text-xs text-slate-500">Beralih ke mode Siswa untuk melamar.</p>}
   <button className="btn2 w-full" onClick={()=>up((x:any)=>({...x,saved:sv?x.saved.filter((i:string)=>i!==op.id):[...x.saved,op.id]}))}>{sv?"Hapus dari tersimpan":"Simpan"}</button></aside>
  {open&&<div role="dialog" aria-modal="true" aria-label="Konfirmasi lamaran" className="fixed inset-0 z-10 flex items-end justify-center bg-black/40 p-4 sm:items-center"><div className="card w-full max-w-md space-y-3">
   <h2 className="font-semibold">Lamar {op.title}</h2><p className="text-sm text-slate-600">Profil dan portofolio {s.student.name} akan dilampirkan (demo).</p>
   <textarea autoFocus aria-label="Pesan singkat" className="inp" rows={3} placeholder="Pesan singkat (opsional)" value={msg} onChange={e=>setMsg(e.target.value)}/>
   <div className="flex justify-end gap-2"><button className="btn2" onClick={()=>setOpen(false)}>Batal</button><button className="btn" onClick={apply}>Kirim lamaran demo</button></div></div></div>}
 </div>;
}
