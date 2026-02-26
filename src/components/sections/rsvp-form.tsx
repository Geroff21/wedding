// components/sections/rsvp-form.tsx
'use client'

import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { submitRSVP } from '@/actions/rsvp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? 'Отправляем...' : 'Подтвердить'}
    </Button>
  )
}

export default function RsvpForm() {
  const formRef = useRef<HTMLFormElement>(null)
  
  return (
    <section id="rsvp" className="py-20 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl text-center mb-2">
                Ждем вас!
              </h2>
              <p className="text-center text-gray-500 mb-6">
                Пожалуйста, подтвердите присутствие
              </p>
              
              <form 
                ref={formRef}
                action={async (formData) => {
                  await submitRSVP(formData)
                  formRef.current?.reset()
                  alert('Спасибо! Ждем вас')
                }}
                className="space-y-4"
              >
                <Input 
                  name="name" 
                  placeholder="Ваше имя" 
                  required 
                />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                />
                <Input 
                  name="guests" 
                  type="number" 
                  placeholder="Количество гостей" 
                  defaultValue={1}
                  min={1}
                />
                <Input 
                  name="message" 
                  placeholder="Пожелания (необязательно)" 
                />
                
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}