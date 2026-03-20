// components/sections/dress-code.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'

export default function DressCode() {
  const { header, text } = weddingData.dressCode
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl mb-8"
        >
          {header}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 text-lg mb-12"
        >
          {text}
        </motion.p>

        {/* Палитра цветов */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12 pr-12 pl-12"
        >
          <div 
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 cursor-default border-2 border-white/20"
            style={{ backgroundColor: '#1c1a19' }}
            title="#1c1a19"
          />
          <div 
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 cursor-default border-2 border-white/20"
            style={{ backgroundColor: '#281914' }}
            title="#281914"
          />
          <div 
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 cursor-default border-2 border-white/20"
            style={{ backgroundColor: '#4d3b31' }}
            title="#4d3b31"
          />
          <div 
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 cursor-default border-2 border-white/20"
            style={{ backgroundColor: '#273921' }}
            title="#273921"
          />
          <div 
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 cursor-default border-2 border-white/20"
            style={{ backgroundColor: '#8aa67e' }}
            title="#8aa67e"
          />
          <div 
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 cursor-default border-2 border-white/20"
            style={{ backgroundColor: '#e5d1c6' }}
            title="#e5d1c6"
          />
          <div 
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 cursor-default border-2 border-white/20"
            style={{ backgroundColor: '#a99e98' }}
            title="#a99e98"
          />
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
    </section>
  )
}