"use client";
import {useState} from "react";import Link from "next/link";import {usePathname,useRouter} from "next/navigation";
import {House,Compass,Send,Bookmark,ShieldCheck,BriefcaseBusiness,Bell,RotateCcw,ChevronDown} from "lucide-react";
import {useStore} from "@/lib/store";import {Avatar} from "./ui";
const NAV:any={student:[["/siswa","Beranda",House],["/peluang","Peluang",Compass],["/siswa/lamaran","Lamaran",Send],["/siswa/tersimpan","Tersimpan",Bookmark]],teacher:[["/guru/verifikasi","Verifikasi",ShieldCheck],["/peluang","Katalog",Compass]],industry:[["/industri/peluang/tambah","Peluang saya",BriefcaseBusiness]]};
const HOME:any={student:"/siswa",teacher:"/guru/verifikasi",industry:"/industri/peluang/tambah"};
const ROLE:any={student:"Siswa",teacher:"Guru / BKK",industry:"Industri / HR"};
export default function Shell({children}:{children:React.ReactNode}){
 const {s,up,reset}=useStore();const r=useRouter();const p=usePathname();const [open,setOpen]=useState(false);
 const who=s.role==="student"?s.student.name:s.role==="teacher"?"Guru BKK (demo)":"PT Nusa Digital Kreatif";
 const bell:any={student:["/siswa/lamaran",s.apps.length],teacher:["/guru/verifikasi",s.opps.filter((o:any)=>o.status==="pending_review").length],industry:["/industri/peluang/tambah",s.opps.filter((o:any)=>o.status==="needs_revision").length]}[s.role];
 const act=(h:string)=>p===h||(h==="/peluang"&&p.startsWith("/peluang"));
 return <div className="min-h-screen pb-16 md:pb-0">
 <header className="sticky top-0 z-20 border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-4">
  <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand"><span className="rounded-lg bg-brand p-1.5 text-white"><Compass size={18}/></span>SiapJalan</Link>
  <nav aria-label="Navigasi utama" className="ml-4 hidden flex-1 gap-1 md:flex">{NAV[s.role].map(([h,l,I]:any)=><Link key={h} href={h} aria-current={act(h)?"page":undefined} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${act(h)?"bg-brand-soft font-semibold text-brand-dark":"text-slate-600 hover:bg-slate-100"}`}><I size={18}/>{l}</Link>)}</nav>
  <div className="ml-auto flex items-center gap-1">
   <Link href={bell[0]} aria-label={`Pembaruan, ${bell[1]} item`} className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Bell size={20}/>{bell[1]>0&&<span className="absolute right-0.5 top-0.5 min-w-4 rounded-full bg-red-700 px-1 text-center text-[10px] font-bold text-white">{bell[1]}</span>}</Link>
   <div className="relative"><button aria-expanded={open} aria-haspopup="menu" onClick={()=>setOpen(!open)} className="flex items-center gap-1 rounded-lg p-1 hover:bg-slate-100"><Avatar name={who} size={32}/><ChevronDown size={14} className="text-slate-500"/></button>
   {open&&<div role="menu" className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"><p className="px-2 py-1 text-xs font-semibold text-slate-500">Mode demo — ganti peran</p>
    {Object.keys(ROLE).map(k=><button key={k} role="menuitemradio" aria-checked={s.role===k} onClick={()=>{up((x:any)=>({...x,role:k}));setOpen(false);r.push(HOME[k])}} className={`block w-full rounded-lg px-2 py-2 text-left text-sm hover:bg-slate-100 ${s.role===k?"font-semibold text-brand-dark":""}`}>{ROLE[k]}</button>)}
    <button role="menuitem" onClick={()=>{setOpen(false);if(confirm("Reset semua data demo?")){reset();r.push("/")}}} className="mt-1 flex w-full items-center gap-2 border-t border-slate-100 px-2 py-2 text-left text-sm text-red-700 hover:bg-red-50"><RotateCcw size={16}/>Reset data demo</button></div>}</div></div></div></header>
 <main className="mx-auto max-w-[1200px] px-4 py-6">{children}</main>
 <footer className="mx-auto max-w-[1200px] px-4 pb-8 text-xs text-slate-500">Mode demo — data tersimpan di peramban ini dan tidak tersinkron antar perangkat. Tidak ada lamaran yang dikirim ke pihak nyata.</footer>
 <nav aria-label="Navigasi bawah" className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">{NAV[s.role].map(([h,l,I]:any)=><Link key={h} href={h} aria-current={act(h)?"page":undefined} className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] ${act(h)?"font-semibold text-brand":"text-slate-600"}`}><I size={20}/>{l}</Link>)}</nav>
 </div>;
}
