// components/sections/calendar.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'

export default function Calendar() {
  const { header } = weddingData.calendar
  
  // Массив дней мая 2026 (пример для 16 мая)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const weddingDay = 16
  
  return (
    <section className="py-20 px-4 bg-primary/5">
      <div className="max-w-lg mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl text-center mb-12 text-gray-800"
        >
          {header}
        </motion.h2>
        
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {/* Дни недели */}
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
            <div key={i} className="text-center text-sm text-gray-400 mb-2">
              {day}
            </div>
          ))}
          
          {/* Пустые ячейки для начала месяца (1 мая 2026 - пятница) */}
          {[1, 2, 3, 4].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {/* Дни месяца */}
          {days.map((day) => {
            const isWeddingDay = day === weddingDay
            
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: day * 0.01 }}
                viewport={{ once: true }}
                className={`
                  aspect-square flex items-center justify-center rounded-full
                  ${isWeddingDay 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-primary/30 transition-colors'
                  }
                `}
              >
                <span className={`
                  text-sm md:text-base
                  ${isWeddingDay ? 'font-semibold' : ''}
                `}>
                  {day}
                </span>
              </motion.div>
            )
          })}
        </div>
        
        {/* Подпись к дате */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <span className="inline-block px-4 py-2 bg-white rounded-full shadow-sm">
            <span className="text-gray-900 font-medium">16 мая</span>
            <span className="text-gray-600 ml-2">— день свадьбы</span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}