// components/sections/timer.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'

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
    <section className="py-20 px-4 bg-green-50">
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
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="text-4xl md:text-5xl font-light text-green-700 mb-2">
                {value}
              </div>
              <div className="text-gray-500 capitalize">
                {unit === 'days' && 'дней'}
                {unit === 'hours' && 'часов'}
                {unit === 'minutes' && 'минут'}
                {unit === 'seconds' && 'секунд'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}