// Kecocokan kriteria deterministik — bukan prediksi diterima/tidaknya.
export function fit(st:any,op:any){
 const has=(s:string)=>st.skills.map((x:string)=>x.toLowerCase()).includes(s.toLowerCase());
 const matched=op.skills.filter(has),missing=op.skills.filter((s:string)=>!has(s));
 const gradeOk=op.grade.includes("SMK")||op.grade.includes("SMA")||op.grade==="Lulusan"&&st.grade==="XII";
 const sk=op.skills.length?matched.length/op.skills.length:1;
 const remote=/remote|online|hybrid/i.test(op.loc),local=op.loc.includes(st.city);
 const score=Math.round(sk*65+(gradeOk?20:0)+(remote||local?10:0)+(st.projects>0?5:0));
 return {score,matched,missing,gradeOk,locOk:remote||local};
}
export const profilePct=(st:any)=>Math.min(100,30+st.skills.length*8+st.projects*10);
