// components/sections/presents.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'
import { Flower, Sprout, Leaf } from 'lucide-react'

export default function Presents() {
  const { header, text } = weddingData.presents
  
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
        
        <div className="flex justify-center gap-8 mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut" 
            }}
          >
            <Flower className="w-12 h-12 text-green-300" />
          </motion.div>
          
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              delay: 0.5,
              ease: "easeInOut" 
            }}
          >
            <Sprout className="w-12 h-12 text-emerald-300" />
          </motion.div>
          
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              delay: 1,
              ease: "easeInOut" 
            }}
          >
            <Leaf className="w-12 h-12 text-lime-300" />
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-600 text-lg leading-relaxed"
        >
          {text}
        </motion.p>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          viewport={{ once: true }}
          className="w-24 h-px bg-emerald-300 mx-auto mt-8"
        />
      </div>
    </section>
  )
}