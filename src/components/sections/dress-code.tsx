// components/sections/dress-code.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'

export default function DressCode() {
  const { header, text } = weddingData.dressCode
  
  return (
    <section className="py-20 px-4 bg-green-50/20">
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
          className="text-gray-600 mb-12"
        >
          {text}
        </motion.p>
    
      </div>
    </section>
  )
}