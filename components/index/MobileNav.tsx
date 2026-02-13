"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

interface MobileNavProps {
  navLinks: { name: string; href: string }[];
}

export const MobileNav = ({ navLinks }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className='md:hidden relative z-10 p-2 text-white bg-white/5 rounded-xl border border-white/10'>
          <Menu className='w-6 h-6' />
        </button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-full bg-[#050110] border-white/10 p-0'
      >
        <SheetTitle className='sr-only'>Навигация</SheetTitle>
        <div className='flex flex-col h-full'>
          {/* Header inside Mobile Menu */}
          <div className='flex items-center justify-between px-4 py-6 border-b border-white/5'>
            <Link href='/' onClick={() => setOpen(false)} className="h-[42px] flex items-center justify-start">
              <Logo className='h-8 text-white' />
            </Link>
          </div>

          <div className='relative flex-1 p-6 flex flex-col gap-6 overflow-y-auto'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-4xl font-black text-white p-2 transition-all hover:text-brand-lavender active:scale-95'
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}


            <div className='mt-auto relative z-10 flex flex-col'>
              <Link
                href="/sign-in"
                className='w-full text-center text-xl font-bold text-white p-4 transition-all active:scale-95'
                onClick={() => setOpen(false)}
              >
                Войти
              </Link>
              <Button
                className='w-full h-16 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-transform'
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href='#enroll' className="flex"
                >
                  Начать обучение
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
