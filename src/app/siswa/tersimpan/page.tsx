"use client";
import {Bookmark} from "lucide-react";import {useStore} from "@/lib/store";import OppCard from "@/components/OppCard";import {EmptyState} from "@/components/ui";
export default function Saved(){const {s}=useStore();const l=s.opps.filter((o:any)=>s.saved.includes(o.id)&&o.status==="approved");
 return <div><h1 className="text-2xl font-bold">Tersimpan</h1><p className="mb-4 text-sm text-slate-600">{l.length} peluang tersimpan</p>
  {l.length?<div className="grid gap-3 md:grid-cols-2">{l.map((o:any)=><OppCard key={o.id} op={o}/>)}</div>:<EmptyState I={Bookmark} title="Belum ada peluang tersimpan" text="Simpan peluang yang menarik agar mudah ditemukan lagi." href="/peluang" cta="Cari peluang"/>}</div>}
