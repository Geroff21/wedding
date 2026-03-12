// components/sections/timer.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'

// Функция для склонения числительных
const declensionNum = (num: number, words: [string, string, string]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5];
  return words[index];
};

export default function Timer() {
  const { header } = weddingData.timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  useEffect(() => {
    const weddingDate = new Date('2026-05-16T16:30:00').getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl mb-12"
        >
          {header}
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="p-4 rounded-lg shadow-sm bg-primary/20"
          >
            <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
              {timeLeft.days}
            </div>
            <div className="text-primary capitalize">
              {declensionNum(timeLeft.days, ['день', 'дня', 'дней'])}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="p-4 rounded-lg shadow-sm bg-primary/20"
          >
            <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
              {timeLeft.hours}
            </div>
            <div className="text-primary capitalize">
              {declensionNum(timeLeft.hours, ['час', 'часа', 'часов'])}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="p-4 rounded-lg shadow-sm bg-primary/20"
          >
            <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
              {timeLeft.minutes}
            </div>
            <div className="text-primary capitalize">
              {declensionNum(timeLeft.minutes, ['минута', 'минуты', 'минут'])}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="p-4 rounded-lg shadow-sm bg-primary/20"
          >
            <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
              {timeLeft.seconds}
            </div>
            <div className="text-primary capitalize">
              {declensionNum(timeLeft.seconds, ['секунда', 'секунды', 'секунд'])}
            </div>
          </motion.div>
        </div>

        {/* Декоративная линия с точечками */}
        <div className="relative flex items-center justify-center mt-12">
          {/* Левая группа точечек */}
          <div className="flex items-center gap-1.5 mr-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`left-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + (i * 0.1), duration: 0.3 }}
                viewport={{ once: true }}
                className="w-1.5 h-1.5 rounded-full bg-black"
              />
            ))}
          </div>
          
          {/* Линия */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
            viewport={{ once: true }}
            className="w-48 h-[2px] bg-black origin-center"
          />
          
          {/* Правая группа точечек */}
          <div className="flex items-center gap-1.5 ml-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`right-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1 + (i * 0.1), duration: 0.3 }}
                viewport={{ once: true }}
                className="w-1.5 h-1.5 rounded-full bg-black"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}