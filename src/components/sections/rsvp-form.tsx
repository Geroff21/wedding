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

      <div className="relative overflow-hidden">

        <div>
          {/* Левое изображение */}
          <div 
            className="absolute inset-0 opacity-40 bg-no-repeat bg-size-[35%] z-0
              bg-[position:left_-20%_bottom_100%] 
              max-sm:bg-[position:left_50%_bottom_100%]  max-sm:bg-size-[250px]"   /* <640px */
            style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
          />
          
          {/* Правое изображение */}
          <div 
            className="absolute inset-0 opacity-40 bg-no-repeat bg-size-[35%] z-0 rotate-180
              bg-[position:left_-20%_top_-50%] 
              max-sm:bg-[position:left_50%_bottom_150%] max-sm:bg-size-[250px]"
            style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
          />
        </div>

        <div className="max-w-md mx-auto z-10 relative">
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

                  {/* Блок с предпочтениями по алкоголю */}
                  <div className="space-y-3 pt-2">
                    <h3 className="font-medium text-gray-700">Предпочтения по алкоголю</h3>
                    
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="alcohol" 
                          value="vodka" 
                          className="w-4 h-4 accent-pink-500"
                        />
                        <span>Водка</span>
                      </label>
                      
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="alcohol" 
                          value="wine" 
                          className="w-4 h-4 accent-pink-500"
                        />
                        <span>Вино</span>
                      </label>
                      
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="alcohol" 
                          value="champagne" 
                          className="w-4 h-4 accent-pink-500"
                        />
                        <span>Шампанское</span>
                      </label>
                      
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="alcohol" 
                          value="whiskey" 
                          className="w-4 h-4 accent-pink-500"
                        />
                        <span>Виски</span>
                      </label>
                      
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="alcohol" 
                          value="non_alcoholic" 
                          className="w-4 h-4 accent-pink-500"
                        />
                        <span>Не пью алкоголь</span>
                      </label>
                    </div>
                  </div>

                  {/* Поле для аллергий и особых пожеланий */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Аллергии и особые пожелания</h3>
                    <textarea 
                      name="dietary_restrictions" 
                      placeholder="Например: аллергия на орехи, не ем мясо, предпочитаю безалкогольное и т.д."
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-y"
                    />
                  </div>

                  <Input 
                    name="message" 
                    placeholder="Дополнительные пожелания (необязательно)" 
                  />
                  
                  <SubmitButton />
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}