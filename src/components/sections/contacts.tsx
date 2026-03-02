// components/sections/contacts.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'
import { Phone, Mail, MessageCircle, Send, Heart, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contacts() {
  const { header, text } = weddingData.contacts;
  
  return (
    <section className="py-20 px-4 bg-white">

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Заголовок с украшением */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {header}
          </h2>
        </motion.div>

        {/* Описание */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          {text}
        </motion.p>

        {/* Telegram чат */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl opacity-10 blur-xl" />
          
          <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-medium text-gray-900">
                Присоединяйтесь к чату гостей
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Общайтесь с другими гостями, делитесь фотографиями и получайте важные обновления о свадьбе
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a 
                href="https://t.me/your_chat" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Send className="w-4 h-4" />
                Присоединиться к чату
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-12 text-sm text-gray-500"
        >
          <p className="flex items-center justify-center gap-1 mt-2">
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            Будем рады видеть вас на нашем празднике
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}