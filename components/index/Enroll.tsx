"use client";

import { Heading, Text } from "./typography";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { BuyForm } from "./BuyForm";

interface EnrollProps {
  title: string;
  description: string;
}

export const Enroll = ({ title, description }: EnrollProps) => {
  return (
    <section
      id='enroll'
      className='py-32 bg-[#050110] text-white overflow-hidden relative'
    >
      {/* Background Decor */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lavender/5 rounded-full blur-[120px] pointer-events-none' />

      <div className='container px-4 mx-auto relative z-10'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                as='h2'
                size='h2'
                className='text-white mb-8 font-black tracking-tight leading-tight'
              >
                {title}
              </Heading>

              <Text
                size='lg'
                className='text-slate-400 mb-12 max-w-lg font-medium leading-relaxed'
              >
                {description}
              </Text>

              <div className='space-y-6'>
                <div className='flex items-center gap-6 group'>
                  <div className='w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-lavender transition-all group-hover:scale-110'>
                    <Mail className='w-6 h-6' />
                  </div>
                  <div>
                    <Text weight='bold' className='text-white tracking-wide'>
                      Email
                    </Text>
                    <Text size='sm' className='text-slate-400 font-medium'>
                      info@altanschool.ru
                    </Text>
                  </div>
                </div>
                <div className='flex items-center gap-6 group'>
                  <div className='w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-blue transition-all group-hover:scale-110'>
                    <Phone className='w-6 h-6' />
                  </div>
                  <div>
                    <Text weight='bold' className='text-white tracking-wide'>
                      Телефон
                    </Text>
                    <Text size='sm' className='text-slate-400 font-medium'>
                      +7 (996) 316-88-71
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='relative'
            >
              <div className='relative p-6 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-brand-lavender/5 to-brand-blue/5 opacity-50' />
                <BuyForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
