export const TYPE:any={pkl:"PKL",internship:"Magang",competition:"Lomba",training:"Pelatihan",graduate_job:"Kerja untuk lulusan"};
export const STATUS:any={pending_review:"Menunggu verifikasi",approved:"Disetujui",needs_revision:"Perlu revisi",rejected:"Ditolak"};
export const APP:any={submitted:"Terkirim",reviewing:"Ditinjau",interview:"Wawancara",accepted:"Diterima",rejected:"Ditolak"};
export type State={role:string;student:any;opps:any[];saved:string[];apps:any[]};
const o=(id,title,org,type,loc,deadline,grade,skills,status,desc,note="")=>({id,title,org,type,loc,deadline,grade,skills,status,desc,note,created:"2026-10-01"});
export const seed:State={role:"student",
student:{name:"Rina Kusumawati",school:"SMK Negeri 2 Bandung",major:"Rekayasa Perangkat Lunak",grade:"XII",city:"Bandung",skills:["HTML","CSS","JavaScript","Figma"],projects:2},
opps:[
o("o1","PKL Frontend Developer","PT Nusa Digital Kreatif","pkl","Bandung (Hybrid)","2026-11-20","SMK",["JavaScript","React","CSS"],"approved","Membantu tim produk membangun antarmuka web internal. Data demo, bukan lowongan nyata."),
o("o2","Magang UI/UX Designer","Studio Laras Rupa","internship","Remote","2026-11-05","SMK",["Figma","Riset Pengguna"],"approved","Mendesain alur aplikasi dan menyusun prototipe bersama desainer senior. Data demo."),
o("o3","Lomba Web Design Pelajar Jabar","Dinas Pendidikan (demo)","competition","Bandung","2026-12-01","SMA/SMK",["HTML","CSS","Figma"],"approved","Kompetisi tingkat provinsi untuk karya situs web responsif. Data demo."),
o("o4","Pelatihan Dasar Data Analitik","Akademi Cakra Data","training","Online","","SMA/SMK",["Excel","Statistik"],"approved","Kelas 4 minggu untuk pemula. Data demo."),
o("o5","Staf Administrasi Digital","CV Mitra Sejahtera","graduate_job","Cimahi","2026-11-30","Lulusan",["Excel","Komunikasi"],"approved","Posisi untuk lulusan SMK. Data demo."),
o("o6","PKL Teknisi Jaringan","PT Telematika Priangan","pkl","Bandung","2026-12-10","SMK",["Jaringan","Linux"],"pending_review","Pengajuan menunggu verifikasi BKK. Data demo."),
o("o7","Magang Konten Digital","Kopi Senja Kreatif","internship","Bandung (Hybrid)","2026-12-15","SMA/SMK",["Fotografi","Canva"],"pending_review","Membuat konten media sosial. Data demo."),
o("o8","Magang Backend Developer","PT Nusa Digital Kreatif","internship","Remote","2026-12-20","SMK",["Node.js","SQL"],"needs_revision","Mohon lengkapi uraian tugas dan jumlah posisi.","Lengkapi tanggung jawab harian dan jumlah posisi."),
o("o9","Pelatihan Kilat Marketing","PT Nusa Digital Kreatif","training","Online","2026-11-25","SMA/SMK",["Pemasaran"],"rejected","Tidak sesuai kriteria peluang sekolah.","Tidak ada pembimbing yang jelas.")],
saved:["o2"],apps:[{id:"a1",oppId:"o3",status:"reviewing",date:"2026-10-12",msg:"Saya tertarik ikut lomba ini."},{id:"a2",oppId:"o4",status:"submitted",date:"2026-10-18",msg:""}]};
