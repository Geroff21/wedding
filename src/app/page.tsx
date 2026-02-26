// app/page.tsx
import Hero from '@/components/sections/hero'
import Welcome from '@/components/sections/welcome'
import Calendar from '@/components/sections/calendar'
import Location from '@/components/sections/location'
import Event from '@/components/sections/event-details'
import DressCode from '@/components/sections/dress-code'
import Presents from '@/components/sections/presents'
import Timer from '@/components/sections/timer'
import RsvpForm from '@/components/sections/rsvp-form'
import Contacts from '@/components/sections/contacts'
import { weddingData } from '@/lib/data'

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Calendar />
      <Location />
      <Event />
      <DressCode />
      <Presents />
      <Timer />
      <RsvpForm />
      <Contacts />
      
      <footer className="py-8 text-center text-gray-500 border-t bg-white">
        <p>По вопросам: {weddingData.contacts.phone || '+7 (999) 123-45-67'}</p>
        <p className="text-sm mt-2">© 2026 • Свадьба Софии и Матвея</p>
      </footer>
    </main>
  )
}