"use client";
import Link from "next/link";import {FolderKanban,Award,Code2,CalendarDays,Lightbulb,Sparkles,ArrowRight} from "lucide-react";
import {useStore} from "@/lib/store";import {fit,profilePct} from "@/lib/matching";import OppCard,{fmt} from "@/components/OppCard";import {Avatar,Progress,SkillChip,dl} from "@/components/ui";
export default function Home(){
 const {s}=useStore();const st=s.student;const open=s.opps.filter((o:any)=>o.status==="approved");
 const top=[...open].sort((a:any,b:any)=>fit(st,b).score-fit(st,a).score);
 const gaps=[...new Set(top.slice(0,4).flatMap((o:any)=>fit(st,o).missing))].slice(0,6);
 const next=top.find((o:any)=>!s.apps.some((a:any)=>a.oppId===o.id));
 const soon=[...open].filter((o:any)=>o.deadline).sort((a:any,b:any)=>a.deadline.localeCompare(b.deadline)).slice(0,3);
 const pct=profilePct(st);
 return <div className="grid gap-5 md:grid-cols-[240px_1fr] lg:grid-cols-[250px_1fr_280px]">
  <aside className="card h-fit overflow-hidden !p-0 md:row-span-2 lg:row-span-1"><div className="h-14 bg-brand-soft" style={{backgroundImage:"radial-gradient(circle at 20% 120%,#0F766E33 0,transparent 55%),radial-gradient(circle at 90% -20%,#0F766E22 0,transparent 50%)"}}/>
   <div className="space-y-3 px-4 pb-4"><div className="-mt-8"><span className="inline-block rounded-full ring-4 ring-white"><Avatar name={st.name} size={64}/></span></div>
    <div><h2 className="font-bold">{st.name}</h2><p className="text-sm text-slate-600">{st.major} · Kelas {st.grade}</p><p className="text-xs text-slate-500">{st.school}, {st.city}</p></div>
    <Progress v={pct} label="Kelengkapan profil"/><p className="text-xs text-slate-500">Tambah skill dan proyek untuk menaikkan kecocokan.</p>
    <ul className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs"><li><FolderKanban size={18} className="mx-auto text-blue-700"/><b className="block">{st.projects}</b>Proyek</li><li><Award size={18} className="mx-auto text-violet-700"/><b className="block">0</b>Sertifikat</li><li><Code2 size={18} className="mx-auto text-brand"/><b className="block">{st.skills.length}</b>Skill</li></ul>
    <div className="flex flex-wrap gap-1">{st.skills.map((k:string)=><SkillChip key={k} k={k}/>)}</div><p className="text-[11px] text-slate-400">Data demo</p></div></aside>
  <div className="min-w-0 space-y-6">
   <div><h1 className="text-2xl font-bold">Halo, {st.name.split(" ")[0]}</h1><p className="text-sm text-slate-600">Ini peluang yang paling sesuai dengan skill dan jenjangmu.</p></div>
   <section aria-labelledby="rek"><h2 id="rek" className="mb-3 text-lg font-bold">Peluang untukmu</h2><div className="grid gap-3 xl:grid-cols-2">{top.slice(0,3).map((o:any)=><OppCard key={o.id} op={o}/>)}</div></section>
   <section className="card border-brand/30 bg-brand-soft/40"><h2 className="flex items-center gap-2 font-bold"><Sparkles size={18} className="text-brand"/>Aksi berikutnya</h2><ul className="mt-2 space-y-2 text-sm">
    {next&&<li><Link className="flex items-center justify-between gap-2 font-medium hover:underline" href={`/peluang/${next.id}`}>Lihat dan lamar {next.title}<ArrowRight size={16}/></Link></li>}
    <li><Link className="flex items-center justify-between gap-2 font-medium hover:underline" href="/siswa/tersimpan">Tinjau {s.saved.length} peluang tersimpan<ArrowRight size={16}/></Link></li></ul></section>
   <section aria-labelledby="akt"><h2 id="akt" className="mb-3 text-lg font-bold">Aktivitasmu</h2>
    <ol className="card space-y-3">{s.apps.length?s.apps.map((a:any)=>{const o=s.opps.find((x:any)=>x.id===a.oppId);return <li key={a.id} className="flex gap-3 text-sm"><span className="mt-0.5 rounded-lg bg-blue-100 p-1.5 text-blue-700"><ArrowRight size={14}/></span><div><p>Kamu melamar <Link className="font-semibold hover:underline" href={`/peluang/${a.oppId}`}>{o?.title}</Link> (demo)</p><p className="text-xs text-slate-500">{fmt(a.date)}</p></div></li>}):<li className="text-sm text-slate-600">Belum ada aktivitas.</li>}</ol></section></div>
  <aside className="min-w-0 space-y-4 md:col-start-2 lg:col-start-3">
   <section className="card"><h2 className="font-bold">Skill yang perlu dikembangkan</h2><div className="mt-2 flex flex-wrap gap-1">{gaps.map((g:any)=><span key={g} className="tag bg-amber-100 text-amber-800">{g}</span>)}</div></section>
   <section className="card"><h2 className="flex items-center gap-2 font-bold"><CalendarDays size={18} className="text-orange-700"/>Deadline terdekat</h2><ul className="mt-2 space-y-2 text-sm">{soon.map((o:any)=><li key={o.id}><Link href={`/peluang/${o.id}`} className="font-medium hover:underline">{o.title}</Link><p className={`text-xs ${dl(o.deadline).cls}`}>{dl(o.deadline).label}</p></li>)}</ul></section>
   <section className="card text-sm"><h2 className="flex items-center gap-2 font-bold"><Lightbulb size={18} className="text-amber-700"/>Tips</h2><p className="mt-1 text-slate-600">Proyek dengan tautan bukti lebih mudah dinilai daripada daftar skill saja.</p></section></aside>
 </div>;
}
