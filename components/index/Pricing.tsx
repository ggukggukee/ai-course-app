"use client";

import { motion } from "framer-motion";
import { Heading, Text } from "./typography";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Zap, Star } from "lucide-react";
import Link from "next/link";

interface PricingProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
}

export const Pricing = ({
  title,
  price,
  features,
  buttonText,
  buttonLink,
}: PricingProps) => {
  return (
    <section id='pricing' className='py-32 bg-[#050110] relative overflow-hidden'>
      {/* Background Decor */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none' />

      <div className='container px-4 mx-auto relative z-10'>
        <div className='max-w-3xl mx-auto text-center mb-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='w-fit mx-auto max-w-[200px] md:max-w-none inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-brand-lavender/10 border border-brand-lavender/20 text-brand-lavender'>
              <Star className='w-3.5 h-3.5 fill-current shrink-0' />
              <span>Простой доступ ко всем материалам</span>
            </div>
            <Heading as='h2' size='h2' className='mb-6 text-white font-black'>
              {title}
            </Heading>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-lg mx-auto relative group'
        >
          {/* Subtle gradient border */}
          <div className='absolute -inset-px bg-linear-to-r from-brand-lavender via-brand-blue to-brand-lavender rounded-[3rem] opacity-50 transition-opacity' />

          <div className='relative p-6 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl'>
            <div className='text-center mb-12'>
              <div className='inline-block p-4 rounded-2xl bg-linear-to-br from-brand-lavender/20 to-brand-blue/20 text-white mb-6'>
                <Rocket className='w-8 h-8' />
              </div>
              <Text
                size='sm'
                className='text-brand-lavender uppercase tracking-[0.2em] font-bold mb-4'
              >
                Лучшее предложение
              </Text>
              <div className='flex items-baseline justify-center gap-2'>
                <span className='text-6xl sm:text-8xl font-black text-white tracking-tighter'>
                  {price}
                </span>
              </div>
            </div>

            <div className='space-y-4 mb-12'>
              {features.map((feature, index) => (
                <div key={index} className='flex items-center gap-4'>
                  <div className='shrink-0 w-6 h-6 rounded-full border border-white/50 flex items-center justify-center'>
                    <Check className='w-4 h-4 text-white' />
                  </div>
                  <Text className='text-slate-300 font-medium text-sm'>
                    {feature}
                  </Text>
                </div>
              ))}
            </div>

            <Button
              className='w-full h-16 rounded-2xl bg-white hover:bg-slate-200 text-[#050110] text-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5'
              asChild
            >
              <Link href={buttonLink}>
                <span className='flex items-center gap-2'>
                  {buttonText}
                  <Zap className='w-5 h-5 fill-current' />
                </span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
