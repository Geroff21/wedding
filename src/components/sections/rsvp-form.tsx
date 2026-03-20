// components/sections/rsvp-form.tsx
'use client'

import { useRef, useState } from 'react'
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
  
  phone: z
    .string()
    .min(10, 'Введите корректный номер телефона (минимум 10 цифр)')
    .max(20, 'Номер телефона слишком длинный')
    .regex(/^[\d\s\+\(\)-]+$/, 'Номер телефона может содержать только цифры, пробелы и символы +, (, ), -'),
  
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
  
  other_alcohol: z
    .string()
    .max(100, 'Максимум 100 символов')
    .optional(),
  
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
  // Крепкие напитки
  { id: 'vodka', label: 'Водка', category: 'strong' },
  { id: 'whiskey', label: 'Виски', category: 'strong' },
  { id: 'cognac', label: 'Коньяк', category: 'strong' },
  { id: 'brandy', label: 'Бренди', category: 'strong' },
  { id: 'rum', label: 'Ром', category: 'strong' },
  { id: 'gin', label: 'Джин', category: 'strong' },
  { id: 'tequila', label: 'Текила', category: 'strong' },
  
  // Вина
  { id: 'red_dry', label: 'Красное сухое', category: 'wine' },
  { id: 'red_semi_sweet', label: 'Красное полусладкое', category: 'wine' },
  { id: 'white_dry', label: 'Белое сухое', category: 'wine' },
  { id: 'white_semi_dry', label: 'Белое полусухое', category: 'wine' },
  { id: 'white_semi_sweet', label: 'Белое полусладкое', category: 'wine' },
  { id: 'rose', label: 'Розовое', category: 'wine' },
  { id: 'champagne', label: 'Шампанское', category: 'wine' },
  { id: 'sparkling', label: 'Игристое', category: 'wine' },
  
  // Другие напитки
  { id: 'beer', label: 'Пиво', category: 'other' },
  { id: 'cocktails', label: 'Коктейли', category: 'other' },
  { id: 'liqueur', label: 'Ликер', category: 'other' },
  
  // Безалкогольное
  { id: 'non_alcoholic', label: 'Не пью алкоголь', category: 'non-alcoholic' },
] as const

// Группировка опций по категориям
const categories = {
  strong: { title: 'Крепкие напитки', options: alcoholOptions.filter(opt => opt.category === 'strong') },
  wine: { title: 'Вина', options: alcoholOptions.filter(opt => opt.category === 'wine') },
  other: { title: 'Другие напитки', options: alcoholOptions.filter(opt => opt.category === 'other') },
  'non-alcoholic': { title: 'Безалкогольное', options: alcoholOptions.filter(opt => opt.category === 'non-alcoholic') },
}

export default function RsvpForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [showOtherAlcohol, setShowOtherAlcohol] = useState(false)
  
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: '',
      phone: '',
      guests: '',
      alcohol: [],
      other_alcohol: '',
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
      setShowOtherAlcohol(false)
      alert('Спасибо! Ждем вас')
    } catch (error) {
      alert('Произошла ошибка. Пожалуйста, попробуйте снова.')
    }
  }

  // Отслеживаем выбор опции "Другое"
  const watchAlcohol = form.watch('alcohol')
  const hasOtherSelected = watchAlcohol?.includes('other_custom')

  return (
    <section id="rsvp" className="py-20 px-4 bg-white">
      <div className="relative overflow-hidden">
        <div>
          {/* Левое изображение */}
          <div 
            className="absolute inset-0 opacity-40 bg-no-repeat bg-size-[35%] z-0
              bg-[position:left_-22%_bottom_100%] 
              max-sm:bg-[position:left_50%_bottom_100%]  max-sm:bg-size-[250px]"
            style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
          />
          
          {/* Правое изображение */}
          <div 
            className="absolute inset-0 opacity-40 bg-no-repeat bg-size-[35%] z-0 rotate-180
              bg-[position:left_-22%_top_-0%] 
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="Номер телефона" 
                              {...field} 
                            />
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
                          <div className="space-y-4 pt-2">
                            <FormLabel className="text-base font-medium text-gray-700">
                              Предпочтения по алкоголю
                            </FormLabel>

                            <FormLabel className="text-xs font-medium text-gray-500">
                              (Можно выбрать несколько вариантов)
                            </FormLabel>
                            
                            {/* Отображаем категории */}
                            {Object.entries(categories).map(([categoryKey, category]) => (
                              <div key={categoryKey} className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-600 border-b pb-1">
                                  {category.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                  {category.options.map((option) => (
                                    <FormField
                                      key={option.id}
                                      control={form.control}
                                      name="alcohol"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(option.id)}
                                                onCheckedChange={(checked) => {
                                                  // Если выбрано "Не пью алкоголь", снимаем все остальные выборы
                                                  if (option.id === 'non_alcoholic' && checked) {
                                                    field.onChange([option.id])
                                                  } 
                                                  // Если выбран другой напиток, а "Не пью алкоголь" было выбрано, убираем его
                                                  else if (option.id !== 'non_alcoholic' && checked) {
                                                    const newValue = field.value?.includes('non_alcoholic')
                                                      ? [option.id]
                                                      : [...field.value, option.id]
                                                    field.onChange(newValue)
                                                  }
                                                  else {
                                                    return checked
                                                      ? field.onChange([...field.value, option.id])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) => value !== option.id
                                                          )
                                                        )
                                                  }
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
                              </div>
                            ))}

                            {/* Опция "Другое" */}
                            <div className="mt-4 pt-2 border-t">
                              <FormField
                                control={form.control}
                                name="alcohol"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-3">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes('other_custom')}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([...field.value, 'other_custom'])
                                            setShowOtherAlcohol(true)
                                          } else {
                                            field.onChange(
                                              field.value?.filter(
                                                (value) => value !== 'other_custom'
                                              )
                                            )
                                            setShowOtherAlcohol(false)
                                            form.setValue('other_alcohol', '')
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      Другое (укажите свой вариант)
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                              
                              {/* Поле для ввода своего варианта */}
                              {(showOtherAlcohol || hasOtherSelected) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="ml-7 mt-2"
                                >
                                  <FormField
                                    control={form.control}
                                    name="other_alcohol"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input 
                                            placeholder="Например: домашнее вино, самогон, сбитень и т.д."
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </motion.div>
                              )}
                            </div>
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
                            Аллергии и особые пожелания по еде
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Например: аллергия на орехи, не ем мясо, вегетарианец, непереносимость лактозы и т.д."
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