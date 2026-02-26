// components/sections/hero.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const { bride, groom, date } = weddingData.hero
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фон с затемнением */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-5xl md:text-7xl font-light mb-4"
        >
          {bride} & {groom}
        </motion.h1>

        <motion.p 
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-2xl mb-8"
        >
          {date}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="bg-white text-gray-900 hover:bg-white/90"
            asChild
          >
            <a href="#rsvp">Подтвердить присутствие</a>
          </Button>
        </motion.div>
      </div>
      
      {/* Стрелка вниз */}
      <motion.a
        href="#couple"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-6 border-b-2 border-r-2 rotate-45" />
      </motion.a>
    </section>
  )
}