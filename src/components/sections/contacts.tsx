// components/sections/contacts.tsx
'use client'

import { motion } from 'framer-motion'
import { weddingData } from '@/lib/data'
import { Phone, Mail, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contacts() {
  const { header, text } = weddingData.contacts
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl mb-6"
        >
          {header}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-8"
        >
          {text}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="bg-telegram-blue hover:bg-telegram-dark text-white gap-2"
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
        </motion.div>
        
        {/* Контакты организаторов */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="p-4 border rounded-lg"
          >
            <p className="font-medium mb-2">София</p>
            <a href="tel:+79991234567" className="text-green-700 text-sm">
              +7 (999) 123-45-67
            </a>
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="p-4 border rounded-lg"
          >
            <p className="font-medium mb-2">Матвей</p>
            <a href="tel:+79991234567" className="text-green-700 text-sm">
              +7 (999) 123-45-67
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}