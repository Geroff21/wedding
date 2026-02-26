// components/sections/location.tsx
'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { weddingData } from '@/lib/data'

export default function Location() {
  const { header, place, timing, address } = weddingData.location
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl text-center mb-12"
        >
          {header}
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-light text-gray-800">{place}</h3>
            
            <div className="flex items-start gap-3 text-gray-600">
              <Clock className="w-5 h-5 mt-1 text-green-700" />
              <div>
                <p className="font-medium">Начало в {timing}</p>
                <p className="text-sm text-gray-500">Просим не опаздывать</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-gray-600">
              <MapPin className="w-5 h-5 mt-1 text-green-700" />
              <div>
                <p>{address}</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 hover:text-green-600 underline mt-1 inline-block"
                >
                  Открыть в картах
                </a>
              </div>
            </div>

            {/* Схема проезда (заглушка) */}
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600">
                🚗 Есть бесплатная парковка для гостей
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden"
          >
            {/* Здесь будет iframe с картой */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
              Карта с локацией
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}