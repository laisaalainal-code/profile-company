"use client";
import { useState } from "react";
import Image from "next/image";
import { MenuLandingPage } from "./components/landing-page-menu/page";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { LandingPageHero } from "./components/landing-page-hero/page";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <main className="relative relative w-full bg-white dark:bg-black">
      <div className="relative z-0 -mt-[96px]">
        <LandingPageHero />
      </div>
      <div className="absolute top-0 left-0 z-10 w-full flex justify-center">
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
              onClick={() => setIsLoginOpen(true)}
              className="
            bg-white 
            border border-gray-300 
            text-orange-500 
            hover:bg-gray-100 
            dark:bg-gray-800 
            dark:border-gray-700 
            dark:text-orange-400
            text-lg
            rounded-full"
              size="lg"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
     {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[500px] rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Tutup form login"
              onClick={() => setIsLoginOpen(false)}
              className="absolute right-3 top-3"
            >
              <X />
            </Button>
            <Field className="w-full space-y-4 pt-2">
              <FieldLabel htmlFor="email-input">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput id="email-input" placeholder="Email" />
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
              <FieldLabel htmlFor="password-input">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput id="password-input" type="password" placeholder="Password" />
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
              <Button type="submit" className="w-full">Submit</Button>
            </Field>
          </div>
        </div>
      )}
    </main>
  );
}