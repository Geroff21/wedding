// components/sections/hero.tsx
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { weddingData } from '@/lib/data'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const { bride, groom, date } = weddingData.hero
  const [displayText, setDisplayText] = useState('')
  const fullText = `${groom} & ${bride}`

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    return () => clearInterval(typingEffect)
  }, [fullText])

  return (
    <section className="relative h-svh flex items-center justify-center overflow-hidden z-10 shadow-sm">
      {/* Фон */}
      <div>
        {/* Левое изображение */}
        <div 
          className="absolute inset-0 opacity-80 bg-no-repeat bg-size-[35%] z-0
            bg-[position:left_-14%_top_110%] 
            max-sm:bg-[position:left_-15%_top_110%]  max-sm:bg-size-[220px]"   /* <640px */
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        
        {/* Правое изображение */}
        <div 
          className="absolute inset-0 opacity-80 bg-no-repeat bg-size-[35%] z-0 rotate-180
            bg-[position:left_-14%_top_110%] 
            max-sm:bg-[position:left_-15%_top_110%] max-sm:bg-size-[220px]"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center text-gray-900 px-4">
        <h1 className="text-4xl md:text-8xl font-light mb-4 font-['Courier_New',_monospace]">
          {displayText}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-2xl md:text-3xl mb-8 font-medium"
        >
          {date}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <Button 
            size="lg" 
            className="bg-primary text-gray-900 hover:bg-primary/80 font-bold text-1xl"
            asChild
          >
            <a href="#rsvp">Подтвердить присутствие</a>
          </Button>
        </motion.div>
      </div>
      
      {/* Стрелка вниз */}
      <motion.a
        href="#welcome"
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-6 border-b-2 border-r-2 rotate-45 border-gray-400" />
      </motion.a>
    </section>
  )
}