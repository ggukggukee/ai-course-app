"use client";

import { motion } from "framer-motion";
import { Heading, Text } from "./typography";
import { CheckCircle2, ShieldCheck, Zap, Cpu } from "lucide-react";

interface AboutProps {
  title: string;
  description: string;
}

export const About = ({ title, description }: AboutProps) => {
  return (
    <section id='about' className='py-32 bg-[#050110] overflow-hidden relative'>
      {/* Background Decor */}
      <div className='absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none' />

      <div className='container px-4 mx-auto relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            <div className='relative aspect-square max-w-md mx-auto'>
              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className='absolute inset-0 border border-white/5 rounded-[3rem]'
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className='absolute inset-8 border border-white/5 rounded-[2.5rem]'
              />

              <div className='absolute inset-12 rounded-[3rem] bg-linear-to-br from-brand-lavender/10 to-brand-blue/10 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm'>
                <div className='relative'>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className='absolute inset-0 bg-brand-lavender blur-[60px] rounded-full'
                  />
                  <Cpu className='w-32 h-32 text-white relative z-10 drop-shadow-[0_0_30px_rgba(225,140,255,0.5)]' />
                </div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className='absolute w-1.5 h-1.5 bg-brand-blue/40 rounded-full'
                    animate={{
                      x: [0, Math.cos((i * 45 * Math.PI) / 180) * 150],
                      y: [0, Math.sin((i * 45 * Math.PI) / 180) * 150],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className='inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue'>
              <Zap className='w-3.5 h-3.5 fill-current' />
              <span>Твои новые возможности</span>
            </div>

            <Heading
              as='h2'
              size='h2'
              className='mb-8 text-white font-black tracking-tight leading-tight'
            >
              {title}
            </Heading>

            <Text
              size='lg'
              className='text-slate-400 mb-10 leading-relaxed font-medium'
            >
              {description}
            </Text>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {[
                {
                  text: "Без лишней теории",
                  icon: Zap,
                  color: "text-brand-lavender",
                },
                {
                  text: "Только практика",
                  icon: Cpu,
                  color: "text-brand-blue",
                },
                {
                  text: "Шесть видео-уроков",
                  icon: ShieldCheck,
                  color: "text-brand-lavender",
                },
                {
                  text: "Просто о сложном",
                  icon: CheckCircle2,
                  color: "text-brand-blue",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className='flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300'
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className='text-white font-bold text-sm tracking-wide'>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
