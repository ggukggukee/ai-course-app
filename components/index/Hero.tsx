"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, Play } from "lucide-react";

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const Hero = ({
  title,
  description,
  buttonText,
  buttonLink,
}: HeroProps) => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050110] pt-20'>
      {/* Modern Gradient Background */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/20 rounded-full blur-[120px] animate-pulse' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-lavender/20 rounded-full blur-[120px] animate-pulse' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050110_100%)]' />
      </div>

      <div className='container relative z-10 py-6 px-4 mx-auto'>
        <div className='max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center gap-3 mb-8 justify-center md:justify-start'
          >
            <span className='px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-lavender font-bold text-xs uppercase tracking-widest backdrop-blur-sm'>
              Курс для подростков
            </span>
            <div className='h-1px w-12 bg-white/10 hidden md:block' />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className='mb-8 leading-[1.1] text-white tracking-tight font-black text-center md:text-left text-4xl sm:text-5xl md:text-7xl lg:text-8xl'>
              {title}
              <span className='block text-transparent bg-clip-text bg-linear-to-r from-brand-lavender to-brand-blue'>
                БУДУЩЕЕ УЖЕ ЗДЕСЬ
              </span>
            </h1>
          </motion.div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p
                className='text-slate-400 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed font-medium text-center md:text-left md:border-l-2 md:border-white/10 md:pl-8'
              >
                {description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='flex flex-wrap gap-4 justify-center md:justify-start'
            >
              <Button
                size='lg'
                className='h-16 px-10 rounded-2xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-blue/20'
                asChild
              >
                <Link href={buttonLink}>
                  <span className='flex items-center gap-2'>
                    {buttonText}
                    <Zap className='w-5 h-5 fill-current' />
                  </span>
                </Link>
              </Button>

              <Button
                size='lg'
                variant='outline'
                className='h-16 px-10 border rounded-2xl border-white/10 text-white hover:bg-white/5 text-xl font-bold transition-all hover:scale-105 active:scale-95'
                asChild
              >
                <Link href='#program'>
                  <span className='flex items-center gap-2'>
                    ПРОГРАММА
                    <Play className='w-5 h-5 fill-current' />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
