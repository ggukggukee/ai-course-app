"use client";

import { motion } from "framer-motion";
import { Heading, Text } from "./typography";
import { LucideIcon, Cpu, Globe, Zap, Layers } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain: Cpu,
  Image: Globe,
  Video: Zap,
  Music: Layers,
};

interface ProgramModule {
  title: string;
  description: string;
  icon: string;
}

interface ProgramProps {
  title: string;
  modules: ProgramModule[];
}

export const Program = ({ title, modules }: ProgramProps) => {
  return (
    <section
      id='program'
      className='py-32 bg-[#050110] relative overflow-hidden'
    >
      {/* Modern Background Decor */}
      <div className='absolute top-0 right-0 w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[100px]' />
      <div className='absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-lavender/10 rounded-full blur-[100px]' />

      <div className='container px-4 mx-auto relative z-10'>
        <div className='max-w-3xl mx-auto text-center mb-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='text-brand-lavender font-bold text-sm mb-4 tracking-[0.2em] uppercase'>
              Ваш путь в мир ИИ
            </div>
            <Heading
              as='h2'
              size='h2'
              className='mb-8 text-white font-black tracking-tight'
            >
              {title}
            </Heading>
            <div className='w-24 h-1.5 bg-linear-to-r from-brand-lavender to-brand-blue mx-auto mb-8 rounded-full' />
            <Text size='lg' className='text-slate-400 font-medium'>
              Погрузись в самые современные технологии. Мы подготовили для тебя
              лучший образовательный маршрут.
            </Text>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {modules.map((module, index) => {
            const Icon = iconMap[module.icon] || Cpu;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group'
              >
                <div className='relative h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 overflow-hidden'>
                  {/* Subtle hover gradient */}
                  <div className='absolute inset-0 bg-linear-to-br from-brand-lavender/5 to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity' />

                  <div className='mb-8 relative'>
                    <div className='relative inline-flex p-5 rounded-2xl bg-linear-to-br from-brand-lavender/20 to-brand-blue/20 text-white group-hover:scale-110 transition-transform duration-500'>
                      <Icon className='w-8 h-8' />
                    </div>
                  </div>

                  <Heading
                    as='h4'
                    size='h5'
                    className='mb-4 text-white font-bold group-hover:text-brand-lavender transition-colors'
                  >
                    {module.title}
                  </Heading>

                  <Text className='text-slate-400 text-sm leading-relaxed font-medium'>
                    {module.description}
                  </Text>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
