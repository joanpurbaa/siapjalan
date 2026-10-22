"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {seed,State} from "./data";
const KEY="siapjalan-demo-v1";const Ctx=createContext<any>(null);
export function Provider({children}:{children:React.ReactNode}){
 const [s,setS]=useState<State|null>(null);const [msg,setMsg]=useState("");
 const toast=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(""),2800)};
 useEffect(()=>{try{const r=localStorage.getItem(KEY);setS(r?JSON.parse(r):seed)}catch{setS(seed)}},[]);
 useEffect(()=>{if(s)localStorage.setItem(KEY,JSON.stringify(s))},[s]);
 if(!s)return <p className="p-6 text-sm">Memuat data demo…</p>;
 const up=(f:(x:State)=>State)=>setS(p=>f(p!));
 return <Ctx.Provider value={{s,up,toast,reset:()=>{setS(seed);toast("Data demo direset")}}}>{children}<div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex justify-center md:bottom-6">{msg&&<p className="rounded-lg bg-ink px-4 py-2 text-sm text-white">{msg}</p>}</div></Ctx.Provider>;
}
export const useStore=()=>useContext(Ctx);
