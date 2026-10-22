import "./globals.css";import {Plus_Jakarta_Sans} from "next/font/google";
import {Provider} from "@/lib/store";import Shell from "@/components/Shell";
const f=Plus_Jakarta_Sans({subsets:["latin"],variable:"--font"});
export const metadata={title:"SiapJalan — Dari karya menuju peluang"};
export default function L({children}:{children:React.ReactNode}){return <html lang="id"><body className={`${f.variable} font-sans`}><Provider><Shell>{children}</Shell></Provider></body></html>}
