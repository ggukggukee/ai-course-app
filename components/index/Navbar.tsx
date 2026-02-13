"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    // { name: "Об онлайн-уроках", href: "#about" },
    { name: "Программа", href: "#program" },
    { name: "Стоимость", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#050110]/80 backdrop-blur-xl border-b border-white/10 py-3"
        : "bg-transparent py-6"
        }`}
    >
      <div className='container mx-auto px-4 flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          <Link href='/' className='relative z-10 group'>
            <Logo className='h-8 text-white group-hover:text-brand-lavender transition-colors' />
          </Link>
          <div className='hidden md:flex items-center gap-10'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors relative group'
              >
                {link.name}
                <span className='absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-lavender transition-all group-hover:w-full' />
              </Link>
            ))}
          </div>
        </div>
        <div className='hidden md:flex items-center gap-4'>
          <Link
            href="/sign-in"
            className='text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors relative group'
          >
            Войти
            <span className='absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-lavender transition-all group-hover:w-full' />
          </Link>

          <Button
            className='rounded-xl font-bold px-8 h-11 transition-all shadow-lg shadow-white/5'
            asChild
          >
            <Link href='#enroll' className='flex items-center gap-2'>
              Обучиться
            </Link>
          </Button>
        </div>
        <MobileNav navLinks={navLinks} />
      </div>
    </nav>
  );
};
