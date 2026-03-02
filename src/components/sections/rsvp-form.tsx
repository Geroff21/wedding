// components/sections/rsvp-form.tsx
'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { submitRSVP } from '@/actions/rsvp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

// Схема валидации с Zod
const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное')
    .regex(/^[a-zA-Zа-яА-Я\s-]+$/, 'Имя может содержать только буквы, пробелы и дефисы'),
  
  email: z
    .string()
    .email('Введите корректный email')
    .max(100, 'Email слишком длинный'),
  
  guests: z
    .string()
    .min(1, 'Минимум 1 гость')
    .max(1, 'Максимум 9 гостей'),
  
  alcohol: z
    .array(z.string())
    .refine((val) => {
      const hasNonAlcoholic = val.includes('non_alcoholic')
      const hasOther = val.some(v => v !== 'non_alcoholic' && val.length > 0)
      return !(hasNonAlcoholic && hasOther)
    }, 'Нельзя выбрать "Не пью алкоголь" вместе с другими напитками'),
  
  dietary_restrictions: z
    .string()
    .max(500, 'Максимум 500 символов')
    .optional(),
  
  message: z
    .string()
    .max(500, 'Максимум 500 символов')
    .optional(),
})

type RsvpFormValues = z.infer<typeof rsvpSchema>

const alcoholOptions = [
  { id: 'vodka', label: 'Водка' },
  { id: 'wine', label: 'Вино' },
  { id: 'champagne', label: 'Шампанское' },
  { id: 'whiskey', label: 'Виски' },
  { id: 'non_alcoholic', label: 'Не пью алкоголь' },
] as const

export default function RsvpForm() {
  const formRef = useRef<HTMLFormElement>(null)
  
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: '',
      email: '',
      guests: '',
      alcohol: [],
      dietary_restrictions: '',
      message: '',
    },
  })

  const onSubmit = async (data: RsvpFormValues) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'alcohol') {
          (value as string[]).forEach((item) => {
            formData.append('alcohol', item)
          })
        } else if (key === 'guests') {
          formData.append(key, value.toString())
        } else if (value) {
          formData.append(key, value as string)
        }
      })
      
      await submitRSVP(formData)
      form.reset()
      alert('Спасибо! Ждем вас')
    } catch (error) {
      alert('Произошла ошибка. Пожалуйста, попробуйте снова.')
    }
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-white">
      <div className="relative overflow-hidden">
        <div>
          {/* Левое изображение */}
          <div 
            className="absolute inset-0 opacity-40 bg-no-repeat bg-size-[35%] z-0
              bg-[position:left_-20%_bottom_100%] 
              max-sm:bg-[position:left_50%_bottom_100%]  max-sm:bg-size-[250px]"
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
                
                <Form {...form}>
                  <form 
                    ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Ваше имя" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Количество гостей" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Блок с предпочтениями по алкоголю */}
                    <FormField
                      control={form.control}
                      name="alcohol"
                      render={() => (
                        <FormItem>
                          <div className="space-y-3 pt-2">
                            <FormLabel className="text-base font-medium text-gray-700">
                              Предпочтения по алкоголю
                            </FormLabel>
                            
                            {alcoholOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="alcohol"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, option.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== option.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Поле для аллергий и особых пожеланий */}
                    <FormField
                      control={form.control}
                      name="dietary_restrictions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Аллергии и особые пожелания
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Например: аллергия на орехи, не ем мясо, предпочитаю безалкогольное и т.д."
                              className="min-h-[100px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Дополнительные пожелания (необязательно)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? 'Отправляем...' : 'Подтвердить'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}