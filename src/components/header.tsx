"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MapPinned, Rocket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/peta", label: "Peta Laporan" },
  { href: "/cek", label: "Cek Laporan" },
];

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-binus text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {NAV_LINKS.map((l, i) => (
              <span key={l.href} className="flex items-center gap-4">
                {i > 0 && <span className="hidden h-3 w-px bg-white/25 sm:block" />}
                <Link
                  href={l.href}
                  className="font-medium opacity-80 transition-opacity hover:opacity-100"
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </nav>
          <Link
            href="/daftar"
            className="inline-flex items-center gap-1.5 rounded-full bg-binus-accent px-3 py-1 font-bold uppercase tracking-wide text-white transition-colors hover:bg-binus-accent-dark"
          >
            <Rocket className="h-3.5 w-3.5" />
            Mulai Dari Sini
          </Link>
        </div>
      </div>

      <div className="border-b border-binus-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-binus text-white">
              <MapPinned className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-extrabold uppercase tracking-tight text-binus sm:text-lg">
                Sistem Pelaporan Komunitas
              </span>
              <span className="block text-[11px] font-medium text-binus-accent uppercase">
                Berbasis Web &amp; Kartografi (GIS)
              </span>
            </span>
          </Link>

          <nav className="hidden items-center lg:flex">
            {NAV_LINKS.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`border-b-4 px-4 py-4 text-sm font-bold transition-colors ${
                    active
                      ? "border-binus-accent text-binus"
                      : "border-transparent text-slate-600 hover:text-binus"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {status === "authenticated" && session.user ? (
              <div className="relative">
                <Button variant="outline" onClick={() => setOpen((v) => !v)}>
                  {session.user.name ?? "Akun"}
                </Button>
                {open && (
                  <div className="absolute right-0 mt-2 w-52 rounded-lg border border-binus-line bg-white p-1 shadow-lg">
                    <Link
                      href="/app"
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-binus hover:bg-binus-soft"
                    >
                      Buka Panel
                    </Link>
                    <button
                      className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      onClick={async () => {
                        setOpen(false);
                        await signOut({ redirect: false });
                        router.push("/");
                        router.refresh();
                      }}
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Masuk</Button>
                </Link>
                <Link href="/daftar">
                  <Button variant="accent">Daftar</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="rounded-md border border-binus-line p-2 text-binus lg:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu navigasi"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-binus-line bg-white lg:hidden">
            <div className="mx-auto max-w-6xl space-y-1 px-4 py-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-semibold text-binus hover:bg-binus-soft"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-binus-line pt-3">
                {status === "authenticated" && session.user ? (
                  <>
                    <Link href="/app" onClick={() => setOpen(false)} className="flex-1">
                      <Button className="w-full">Buka Panel</Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="flex-1"
                      onClick={async () => {
                        setOpen(false);
                        await signOut({ redirect: false });
                        router.push("/");
                        router.refresh();
                      }}
                    >
                      Keluar
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/daftar" onClick={() => setOpen(false)} className="flex-1">
                      <Button variant="accent" className="w-full">
                        Daftar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}