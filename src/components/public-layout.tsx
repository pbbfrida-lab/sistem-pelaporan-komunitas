import Link from "next/link";
import Header from "@/components/header";
import { MapPinned, ArrowUpRight, Phone, Mail, MessageCircleMore, Globe2, ClipboardList, TicketCheck } from "lucide-react";

const START_LINKS = [
  {
    href: "/daftar",
    icon: MapPinned,
    title: "Mulai dari Sini",
    desc: "Daftar akun masyarakat",
  },
  {
    href: "/cek",
    icon: TicketCheck,
    title: "Info Tiket Laporan",
    desc: "Pantau status pengaduan",
  },
  {
    href: "/peta",
    icon: Globe2,
    title: "Lihat Peta",
    desc: "Sebaran laporan warga",
  },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>

      <section className="border-t-4 border-binus-accent bg-binus-soft">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-binus">
              Future Ready
            </p>
            <h2 className="text-2xl font-extrabold text-binus">Berkolaborasi dengan Komunitas Anda</h2>
          </div>
          {START_LINKS.map((l) => (
            <Link
              key={l.title}
              href={l.href}
              className="group flex items-start gap-4 rounded-xl border border-binus-line bg-white p-5 shadow-sm transition-all hover:border-binus hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-binus text-white">
                <l.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="flex items-center gap-1 font-bold text-binus">
                  {l.title}
                  <ArrowUpRight className="h-4 w-4 text-binus-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="block text-sm text-slate-500">{l.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-binus-deeper text-slate-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-binus">
                <MapPinned className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-extrabold uppercase">Sistem Pelaporan Komunitas</div>
                <div className="text-[11px] text-slate-400">Berbasis Web &amp; GIS</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Aplikasi pelaporan dan pemantauan masalah lingkungan serta fasilitas
              umum yang menghubungkan masyarakat, petugas, dan pemerintah dalam
              satu alur verifikasi yang transparan.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Menu Utama</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="text-slate-300 hover:text-white" href="/">Beranda</Link></li>
              <li><Link className="text-slate-300 hover:text-white" href="/peta">Peta Laporan</Link></li>
              <li><Link className="text-slate-300 hover:text-white" href="/cek">Cek Laporan</Link></li>
              <li><Link className="text-slate-300 hover:text-white" href="/daftar">Daftar Akun</Link></li>
              <li><Link className="text-slate-300 hover:text-white" href="/login">Masuk Panel</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Hubungi Kami</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-binus-accent" />
                <span>Dinas/Pemerintah Desa<br />0800-0000-0000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircleMore className="mt-0.5 h-4 w-4 shrink-0 text-binus-accent" />
                <span>WhatsApp<br />08xx-xxxx-xxxx</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-binus-accent" />
                <span>lapor@komunitas.go.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Tentang Aplikasi</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><ClipboardList className="h-4 w-4 text-binus-accent" /> Skripsi — Teknik Informatika</li>
              <li className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-binus-accent" /> Pelaporan Berbasis Peta (GIS)</li>
              <li className="flex items-center gap-2"><TicketCheck className="h-4 w-4 text-binus-accent" /> Nomor Tiket per Hari</li>
            </ul>
            <p className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
              Transparan, terukur, dan dapat diaudit dari hulu hingga tuntas.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Sistem Pelaporan Komunitas Berbasis Web dan GIS</p>
            <p>Skripsi — Program Studi Teknik Informatika</p>
          </div>
        </div>
      </footer>
    </>
  );
}