import Link from "next/link";
import {
  MapPinned,
  Camera,
  Ticket,
  Bell,
  ClipboardCheck,
  BarChart3,
  FileDown,
  ArrowRight,
  ArrowUpRight,
  Play,
  Globe2,
  Radar,
  Users2,
  CircleSlash2,
} from "lucide-react";
import PublicLayout from "@/components/public-layout";
import { Button, Card, Badge } from "@/components/ui";
import { prisma } from "@/lib/db";

const steps = [
  {
    icon: Camera,
    title: "Laporkan",
    desc: "Foto masalahnya, lokasi otomatis terdeteksi dari GPS atau klik titik pada peta.",
  },
  {
    icon: Ticket,
    title: "Dapatkan Nomor Tiket",
    desc: "Terima kode LAP-xxxxxxxx-0001 untuk memantau status pengaduan Anda.",
  },
  {
    icon: ClipboardCheck,
    title: "Diproses Petugas",
    desc: "Admin verifikasi, petugas menindaklanjuti, dan Anda tahu perkembangan tiap langkah.",
  },
];

const features = [
  {
    icon: Globe2,
    title: "Peta Interaktif (GIS)",
    desc: "Semua laporan tampil sebagai titik di peta dengan filter kategori, status, prioritas, dan wilayah.",
  },
  {
    icon: Bell,
    title: "Notifikasi",
    desc: "Setiap perubahan status laporan langsung masuk ke panel pengguna.",
  },
  {
    icon: Camera,
    title: "Bukti Foto",
    desc: "Lampirkan foto dan dokumentasi tindak lanjut agar proses transparan.",
  },
  {
    icon: Ticket,
    title: "Nomor Tiket",
    desc: "Pelacakan pengaduan mudah memakai kode laporan yang unik per hari.",
  },
  {
    icon: BarChart3,
    title: "Statistik",
    desc: "Admin mendapat grafik tren laporan bulanan dan sebaran per kategori/wilayah.",
  },
  {
    icon: FileDown,
    title: "Ekspor Laporan",
    desc: "Rekap data dalam format PDF dan CSV untuk arsip maupun publikasi.",
  },
];

const infos = [
  {
    icon: Globe2,
    label: "Platform",
    value: "Berbasis Web & GIS",
  },
  {
    icon: Radar,
    label: "Pelacakan",
    value: "Nomor Tiket Unik",
  },
  {
    icon: Bell,
    label: "Pembaruan",
    value: "Notifikasi Real-time",
  },
  {
    icon: Users2,
    label: "Kolaborasi",
    value: "Masyarakat & Petugas",
  },
];

const ticketSamples = [
  { code: "LAP-20260920-0001", label: "Sedang Diproses", color: "bg-amber-100 text-amber-800" },
  { code: "LAP-20260919-0007", label: "Selesai", color: "bg-emerald-100 text-emerald-700" },
  { code: "LAP-20260919-0005", label: "Sedang Diproses", color: "bg-sky-100 text-sky-800" },
];

export default async function HomePage() {
  let stats = {
    total: 0,
    selesai: 0,
    diproses: 0,
    tindaklanjut: 0,
  };
  let categories: Array<{ id: string; name: string }> = [];

  try {
    const [statusCounts, cats] = await Promise.all([
      prisma.report.groupBy({ by: ["status"], _count: true }),
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        take: 6,
        select: { id: true, name: true },
      }),
    ]);
    categories = cats;
    const toMap = new Map(statusCounts.map((s) => [s.status, s._count]));
    stats = {
      total: statusCounts.reduce((acc, s) => acc + s._count, 0),
      selesai: toMap.get("SELESAI") ?? 0,
      diproses: toMap.get("DIPROSES") ?? 0,
      tindaklanjut: toMap.get("DITINDAKLANJUTI") ?? 0,
    };
  } catch {
    // DB belum siap — halaman tetap tampil dengan statistik kosong.
  }

  return (
    <PublicLayout>
      {/* Breadcrumb + hero ala halaman program BINUS */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-binus">Beranda</Link>
            <ArrowRight className="h-3 w-3" />
            <Link href="/peta" className="hover:text-binus">Layanan</Link>
            <ArrowRight className="h-3 w-3" />
            <span className="font-semibold text-binus">Sistem Pelaporan Komunitas</span>
          </nav>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[1.15fr_1fr] md:py-14">
          <div>
            <Badge className="border border-binus/15 bg-binus-soft text-binus">
              Partisipasi Masyarakat &bull; Berbasis Web + GIS
            </Badge>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-binus sm:text-5xl">
              Laporkan masalah lingkungan,
              <span className="relative mt-1 block w-fit">
                pantau sampai tuntas
                <span className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-1 rounded-full bg-binus-accent" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Aplikasi pelaporan berbasis web dan sistem informasi geografis yang
              menghubungkan masyarakat, petugas, dan pemerintah desa/kecamatan
              dalam satu alur verifikasi dan tindak lanjut yang transparan.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/daftar">
                <Button variant="accent" className="px-6 py-2.5 text-base font-bold uppercase">
                  Mulai Laporkan <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/peta">
                <Button variant="outline" className="px-6 py-2.5 text-base font-bold uppercase">
                  Lihat Peta
                </Button>
              </Link>
            </div>

            {categories.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Kategori Layanan Aktif
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href="/peta"
                      className="rounded-full border border-binus-line bg-white px-3 py-1 text-xs font-semibold text-binus transition-colors hover:bg-binus hover:text-white"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Thumbnail peta ala thumbnail video program BINUS */}
            <Link
              href="/peta"
              className="group relative block overflow-hidden rounded-2xl border border-binus-line shadow-lg"
            >
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-binus-deeper">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
                <MapPinned className="h-20 w-20 text-white/20" />
                <span className="absolute left-8 top-8 flex h-3 w-3 rounded-full bg-emerald-400" />
                <span className="absolute right-12 top-16 flex h-3 w-3 rounded-full bg-amber-400" />
                <span className="absolute bottom-12 left-14 flex h-3 w-3 rounded-full bg-sky-400" />
                <span className="absolute bottom-16 right-16 flex h-3 w-3 rounded-full bg-red-400" />
                <span className="relative flex items-center gap-3 rounded-full bg-white/95 py-2 pl-3 pr-5 font-bold text-binus shadow-lg transition-transform group-hover:scale-105">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-binus-accent text-white">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                  Lihat Peta Langsung
                </span>
              </div>
            </Link>

            {/* Kartu tiket live */}
            <Card className="overflow-hidden border-binus-line">
              <div className="flex items-center justify-between border-b border-binus-line bg-binus-soft px-4 py-2.5">
                <span className="text-xs font-bold uppercase tracking-wide text-binus">
                  Laporan Warga Terkini
                </span>
                <Link
                  href="/peta"
                  className="inline-flex items-center gap-1 text-xs font-bold text-binus-accent hover:underline"
                >
                  Buka Peta <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="space-y-2 p-4">
                {ticketSamples.map((t) => (
                  <div
                    key={t.code}
                    className="flex items-center justify-between rounded-lg border border-binus-line px-3 py-2"
                  >
                    <span className="text-sm font-semibold text-binus">{t.code}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.color}`}>
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistik live */}
      <section className="bg-binus text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {[
            { label: "Total Laporan", value: stats.total },
            { label: "Selesai", value: stats.selesai },
            { label: "Sedang Diproses", value: stats.diproses },
            { label: "Ditindaklanjuti", value: stats.tindaklanjut },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-white">{s.value}</div>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wider text-blue-200">
                <CircleSlash2 className="h-3 w-3" /> {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cara kerja — ala "Program Description" */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-10 bg-binus-accent" />
            <h2 className="text-2xl font-extrabold text-binus sm:text-3xl">
              Bagaimana Cara Kerjanya
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-slate-600">
            Mulai dari melaporkan hingga diproses petugas, tiga langkah sederhana
            untuk menyalurkan aspirasi Anda ke pemerintah setempat.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={s.title} className="relative overflow-hidden border-binus-line p-6 transition-shadow hover:shadow-lg">
                <span className="absolute -right-1 -top-3 text-7xl font-extrabold text-binus-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-binus text-white">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-binus">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info program (Duration / Academic Title ala BINUS) */}
      <section className="bg-binus-soft">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-10 bg-binus-accent" />
            <h2 className="text-2xl font-extrabold text-binus sm:text-3xl">
              Keunggulan Sistem
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infos.map((info) => (
              <div key={info.label} className="rounded-xl border border-binus-line bg-white p-5">
                <info.icon className="h-8 w-8 text-binus-accent" />
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {info.label}
                </div>
                <div className="font-bold text-binus">{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur unggulan — ala "Available at" cards */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-10 bg-binus-accent" />
            <h2 className="text-2xl font-extrabold text-binus sm:text-3xl">
              Layanan Tersedia
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.title}
                href="/peta"
                className="group overflow-hidden rounded-xl border border-binus-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-binus to-binus-deeper">
                  <f.icon className="h-16 w-16 text-white/25 transition-transform group-hover:scale-110" />
                  <span className="absolute left-4 top-4 h-8 w-8 rounded-full bg-binus-accent/90 transition-transform group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-binus">{f.title}</h3>
                    <ArrowUpRight className="h-4 w-4 text-binus-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* For more information — ala BINUS buttons */}
          <div className="mt-12 rounded-2xl border border-binus-line bg-binus-soft p-8 text-center">
            <h3 className="text-xl font-extrabold text-binus sm:text-2xl">
              Untuk Informasi Tindak Lanjut, Klik Tombol di Bawah
            </h3>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link href="/peta">
                <Button variant="primary" className="font-bold uppercase">Lihat Peta</Button>
              </Link>
              <Link href="/cek">
                <Button variant="outline" className="font-bold uppercase">Cek Tiket Laporan</Button>
              </Link>
              <Link href="/daftar">
                <Button variant="accent" className="font-bold uppercase">Daftar Sekarang</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}