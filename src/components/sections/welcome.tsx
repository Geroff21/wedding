// components/sections/welcome.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'

export default function Welcome() {
  const { header, text, text2 } = weddingData.welcome
  
  return (
    <section id="welcome" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-8 text-gray-800"
        >
          {header}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-gray-600 mb-4 font-light"
        >
          {text}
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-gray-500"
        >
          {text2}
        </motion.p>

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