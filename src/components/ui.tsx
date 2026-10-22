import Link from "next/link";
import {Building2,BriefcaseBusiness,Trophy,GraduationCap,ShieldCheck,Clock3,Pencil,CircleX,Send,Eye,UsersRound,CheckCircle2} from "lucide-react";
const PAL=["bg-teal-100 text-teal-800","bg-violet-100 text-violet-700","bg-pink-100 text-pink-700","bg-orange-100 text-orange-700","bg-blue-100 text-blue-700"];
export function Avatar({name,size=40,square}:{name:string;size?:number;square?:boolean}){
 const i=[...name].reduce((a,c)=>a+c.charCodeAt(0),0)%5;
 const ini=name.replace(/[()]/g,"").split(" ").filter(w=>!/^(PT|CV)$/.test(w)).slice(0,2).map(w=>w[0]).join("");
 return <span aria-hidden="true" style={{width:size,height:size,fontSize:size/2.8}} className={`inline-flex shrink-0 items-center justify-center font-semibold ${square?"rounded-xl":"rounded-full"} ${PAL[i]}`}>{ini}</span>;
}
export const TYPES:any={pkl:["PKL",Building2,"bg-blue-100 text-blue-800"],internship:["Magang",BriefcaseBusiness,"bg-violet-100 text-violet-800"],competition:["Lomba",Trophy,"bg-orange-100 text-orange-800"],training:["Pelatihan",GraduationCap,"bg-green-100 text-green-800"],graduate_job:["Kerja untuk lulusan",BriefcaseBusiness,"bg-teal-100 text-teal-800"]};
export function TypeBadge({t}:{t:string}){const [l,I,c]=TYPES[t];return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${c}`}><I size={14}/>{l}</span>}
const SB:any={approved:["Diverifikasi BKK",ShieldCheck,"bg-green-100 text-green-800"],pending_review:["Menunggu verifikasi",Clock3,"bg-amber-100 text-amber-800"],needs_revision:["Perlu revisi",Pencil,"bg-orange-100 text-orange-800"],rejected:["Ditolak",CircleX,"bg-red-100 text-red-800"],submitted:["Terkirim",Send,"bg-slate-100 text-slate-700"],reviewing:["Ditinjau",Eye,"bg-blue-100 text-blue-800"],interview:["Wawancara",UsersRound,"bg-violet-100 text-violet-800"],accepted:["Diterima",CheckCircle2,"bg-green-100 text-green-800"]};
export function StatusBadge({k}:{k:string}){const [l,I,c]=SB[k];return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${c}`}><I size={14}/>{l}</span>}
export const SkillChip=({k}:{k:string})=><span className="tag">{k}</span>;
export function Progress({v,label}:{v:number;label:string}){return <div><div className="mb-1 flex justify-between text-xs"><span>{label}</span><b>{v}%</b></div><div role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label} className="h-1.5 rounded bg-slate-100"><div className="h-full rounded bg-brand" style={{width:`${v}%`}}/></div></div>}
export function EmptyState({I,title,text,href,cta}:any){return <div className="card flex flex-col items-center gap-2 py-10 text-center"><span className="rounded-xl bg-brand-soft p-3 text-brand-dark"><I size={24}/></span><h2 className="font-semibold">{title}</h2><p className="max-w-sm text-sm text-slate-600">{text}</p>{href&&<Link href={href} className="btn mt-1">{cta}</Link>}</div>}
export function dl(d:string){if(!d)return {label:"Tidak ada deadline",cls:"text-slate-500"};const n=Math.ceil((new Date(d).getTime()-Date.now())/864e5);
 if(n<0)return {label:"Ditutup",cls:"text-red-700"};if(n<=7)return {label:`Deadline ${n} hari lagi`,cls:"font-semibold text-amber-700"};return {label:new Date(d).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}),cls:"text-slate-500"}}
