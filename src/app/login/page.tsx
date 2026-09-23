import { Suspense } from "react";
import PublicLayout from "@/components/public-layout";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui";

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-16">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-1.5 w-12 rounded-full bg-binus-accent" />
          <h1 className="text-2xl font-extrabold text-binus">Masuk</h1>
          <p className="mt-1 text-sm text-slate-500">
            Silakan masuk untuk mengakses panel Anda.
          </p>
        </div>
        <Card className="p-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </Card>
      </div>
    </PublicLayout>
  );
}