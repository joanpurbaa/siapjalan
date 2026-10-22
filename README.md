# SiapJalan (prototipe frontend)
`npm install && npm run dev` lalu buka http://localhost:3000.
Data demo disimpan di localStorage (`siapjalan-demo-v1`); ganti peran lewat "Mode Demo" di header; reset lewat footer.
Rute: `/`, `/peluang`, `/peluang/[id]`, `/siswa`, `/siswa/tersimpan`, `/siswa/lamaran`, `/guru/verifikasi`, `/industri/peluang/tambah`.
Alur utama: industri ajukan → guru setujui → tampil di katalog siswa → siswa simpan/lamar.
Backend nanti: ganti `src/lib/store.tsx` dengan pemanggilan API.
