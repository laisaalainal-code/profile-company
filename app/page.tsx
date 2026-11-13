"use client";
 
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MenuLandingPage } from "./components/landing-page-menu/page";
import { Button } from "@/components/ui/button";
import { LandingPageHero } from "./components/landing-page-hero/page";
import { ArrowRight, Eye, EyeOff, KeyRound, Mail, X } from "lucide-react"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
 
export default function Home() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
 
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
 
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Login gagal.");
 
      setIsLoginOpen(false);
      setPassword("");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login gagal.");
    } finally {
      setIsSubmitting(false);
    }
  }
 
  return (
    <main className="relative relative w-full bg-white dark:bg-black">
      <div className="relative z-0 -mt-[96px]">
        <LandingPageHero />
      </div>
      <div className="absolute top-0 left-0 z-20 w-full flex justify-center">
        <div className="w-[95%] h-[80px] bg-blue-800 dark:bg-blue-800 rounded-[70px] flex mt-4 mx-8 p-4">
          {/* logo */}
          <div className="relative w-[200px] h-[50px] rounded-[70px] items-center justify-start">
            <Image className="p-[7px]" src="/img/smk_mvp_ars_logo_white.png" alt="logo" fill />
          </div>
          {/* menu */}
          <div className="flex flex-1 items-center justify-center">
            <MenuLandingPage />
          </div>
          {/* login */}
          <div className="flex items-center justify-end p-4">
            <Button
              onClick={() => {
                setLoginError("");
                setIsLoginOpen(true);
              }}
              className="
              bg-white 
              border border-gray-300 
              text-orange-500 
              hover:bg-gray-100 
              dark:bg-gray-800 
              dark:border-gray-700 
              dark:text-orange-400
              text-[16px]
              font-semibold
              rounded-full
              p-[20px]"
              size="lg"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      {isLoginOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSubmitting) setIsLoginOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape" && !isSubmitting) setIsLoginOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-9"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-blue-800" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Tutup form login"
              onClick={() => setIsLoginOpen(false)}
              disabled={isSubmitting}
              className="absolute right-4 top-4 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <X aria-hidden="true" />
            </Button>
            <div className="mb-7 flex flex-col items-center pt-2 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <KeyRound aria-hidden="true" className="size-6" />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">Portal administrasi</p>
              <h2 id="login-title" className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Selamat datang kembali
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Masuk dengan akun yang terdaftar untuk melanjutkan.
              </p>
            </div>
 
            <form onSubmit={handleLogin} className="space-y-5">
              <Field className="gap-2">
                <FieldLabel htmlFor="email-input" className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Email
                </FieldLabel>
                <InputGroup className="h-11 rounded-xl border-slate-300 bg-slate-50/70 dark:bg-slate-800/60">
                  <InputGroupAddon align="inline-start">
                    <Mail aria-hidden="true" className="text-slate-400" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email-input"
                    type="email"
                    name="email"
                    placeholder="nama@email.com"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </InputGroup>
              </Field>
 
              <Field className="gap-2">
                <FieldLabel htmlFor="password-input" className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Password
                </FieldLabel>
                <InputGroup className="h-11 rounded-xl border-slate-300 bg-slate-50/70 dark:bg-slate-800/60">
                  <InputGroupAddon align="inline-start">
                    <KeyRound aria-hidden="true" className="text-slate-400" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="password-input"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={isPasswordVisible ? "Sembunyikan password" : "Tampilkan password"}
                      onClick={() => setIsPasswordVisible((visible) => !visible)}
                      disabled={isSubmitting}
                    >
                      {isPasswordVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
 
              {loginError && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                  {loginError}
                </p>
              )}
 
              <Button type="submit" className="h-11 w-full rounded-xl bg-blue-800 text-white hover:bg-blue-900" disabled={isSubmitting}>
                <span>{isSubmitting ? "Memverifikasi..." : "Masuk"}</span>
                {!isSubmitting && <ArrowRight aria-hidden="true" className="ml-auto" />}
              </Button>
            </form>
            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              Gunakan email dan password akun Anda.
            </p>
          </section>
        </div>
      )}
    </main>
 
  );
}
