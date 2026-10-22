"use client";
import Link from "next/link";import {useRouter} from "next/navigation";import {useStore} from "@/lib/store";
import OppCard from "@/components/OppCard";
const R=[["student","Masuk sebagai Siswa","/siswa","Bangun portofolio dan temukan peluang yang cocok."],["teacher","Masuk sebagai Guru/BKK","/guru/verifikasi","Verifikasi peluang dari industri."],["industry","Masuk sebagai Industri/HR","/industri/peluang/tambah","Ajukan PKL, magang, dan lomba."]];
export default function Home(){
 const {s,up}=useStore();const r=useRouter();
 return <div className="space-y-8">
  <section className="py-6"><p className="text-sm font-semibold text-brand">Dari karya menuju peluang.</p>
   <h1 className="mt-1 max-w-2xl text-3xl font-semibold">Portofolio siswa, peluang terverifikasi sekolah, dalam satu tempat.</h1>
   <p className="mt-2 max-w-xl text-slate-600">Platform kesiapan karier untuk siswa SMA/SMK. Prototipe demo — semua data tersimpan di peramban Anda.</p>
   <div className="mt-4 flex flex-wrap gap-2"><Link href="/peluang" className="btn">Jelajahi Peluang</Link></div></section>
  <section aria-labelledby="peran"><h2 id="peran" className="mb-3 text-lg font-semibold">Coba demo</h2>
   <div className="grid gap-3 sm:grid-cols-3">{R.map(([role,l,h,d])=><button key={role} className="card text-left hover:border-brand" onClick={()=>{up((x:any)=>({...x,role}));r.push(h)}}><b className="block">{l}</b><span className="text-sm text-slate-600">{d}</span></button>)}</div></section>
  <section><h2 className="mb-3 text-lg font-semibold">Contoh peluang</h2>
   <div className="grid gap-3 sm:grid-cols-2">{s.opps.filter((o:any)=>o.status==="approved").slice(0,2).map((o:any)=><OppCard key={o.id} op={o}/>)}</div></section>
 </div>;
}
