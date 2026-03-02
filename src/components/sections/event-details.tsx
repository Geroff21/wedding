// components/sections/event.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'
import { GlassWater, Cake, PartyPopper, Coffee } from 'lucide-react'

export default function Event() {
  const { header, guestGathering, galaDinner, cake, ending } = weddingData.event
  
  const events = [
    { ...guestGathering, icon: Coffee },
    { ...galaDinner, icon: GlassWater },
    { ...cake, icon: Cake },
    { ...ending, icon: PartyPopper },
  ]
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl text-center mb-16"
        >
          {header}
        </motion.h2>
        
        <div className="relative overflow-hidden">

          <div>
            {/* Левое изображение */}
            <div 
              className="absolute inset-0 opacity-40 bg-no-repeat bg-size-[35%] z-0
                bg-[position:left_-20%_bottom_150%] 
                max-sm:bg-[position:left_50%_bottom_150%]  max-sm:bg-size-[250px]"   /* <640px */
              style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
            />
            
            {/* Правое изображение */}
            <div 
              className="absolute inset-0 opacity-40 bg-no-repeat bg-size-[35%] z-0 rotate-180
                bg-[position:left_-10%_top_0%] 
                max-sm:bg-[position:left_50%_bottom_100%] max-sm:bg-size-[250px]"
              style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto">

            {/* Вертикальная линия */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/40" />
            
            {events.map((event, index) => {
              const Icon = event.icon
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`
                    relative flex items-center mb-12
                    ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
                  `}
                >
                  {/* Точка на линии */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full" />
                  
                  {/* Контент */}
                  <div className={`
                    ml-12 md:ml-0 md:w-1/2
                    ${isEven ? 'md:pr-12' : 'md:pl-12'}
                  `}>
                    <div className="bg-primary/20 p-6 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-primary text-xl font-medium">{event.time}</span>
                      </div>
                      <p className="text-lg text-gray-800">{event.text}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

          </div>
        </div>
      </div>
    </section>
  )
}