"use client";
import Link from "next/link";import {Bookmark,MapPin,Globe2,School,CalendarDays} from "lucide-react";
import {useStore} from "@/lib/store";import {fit} from "@/lib/matching";import {Avatar,TypeBadge,StatusBadge,SkillChip,dl} from "./ui";
export const fmt=(d:string)=>d?new Date(d).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}):"Tidak ada deadline";
export default function OppCard({op}:{op:any}){
 const {s,up,toast}=useStore();const m=fit(s.student,op);const sv=s.saved.includes(op.id);const d=dl(op.deadline);const remote=/remote|online/i.test(op.loc);
 const toggle=()=>{up((x:any)=>({...x,saved:sv?x.saved.filter((i:string)=>i!==op.id):[...x.saved,op.id]}));toast(sv?"Dihapus dari tersimpan":"Peluang disimpan")};
 return <article className="card flex flex-col gap-3 transition-colors hover:border-brand">
  <div className="flex items-start gap-3"><Avatar name={op.org} size={44} square/>
   <div className="min-w-0 flex-1"><TypeBadge t={op.type}/><h3 className="mt-1 break-words font-semibold leading-snug"><Link href={`/peluang/${op.id}`} className="hover:underline">{op.title}</Link></h3><p className="truncate text-sm text-slate-600">{op.org}</p></div>
   <button aria-label={sv?"Hapus dari tersimpan":"Simpan peluang"} aria-pressed={sv} onClick={toggle} className="rounded-lg p-2 text-brand hover:bg-brand-soft"><Bookmark size={18} fill={sv?"currentColor":"none"}/></button></div>
  <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
   <li className="flex items-center gap-1">{remote?<Globe2 size={14}/>:<MapPin size={14}/>}{op.loc}</li><li className="flex items-center gap-1"><School size={14}/>{op.grade}</li><li className={`flex items-center gap-1 ${d.cls}`}><CalendarDays size={14}/>{d.label}</li></ul>
  <div className="flex flex-wrap gap-1">{op.skills.map((k:string)=><SkillChip key={k} k={k}/>)}</div>
  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
   <div className="min-w-[8rem]" title="Kecocokan kriteria berdasarkan skill, jenjang, dan lokasi — bukan peluang diterima."><p className="text-xs font-semibold text-brand-dark">Kecocokan kriteria {m.score}%</p><div className="mt-1 h-1.5 rounded bg-slate-100"><div className="h-full rounded bg-brand" style={{width:`${m.score}%`}}/></div></div>
   <div className="flex items-center gap-2"><StatusBadge k={op.status}/><Link href={`/peluang/${op.id}`} className="btn2 !py-1 text-xs">Lihat detail</Link></div></div>
 </article>;
}
