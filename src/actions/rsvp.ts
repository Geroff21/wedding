// app/actions/rsvp.ts
'use server'

export async function submitRSVP(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const guests = formData.get('guests')
  const message = formData.get('message')
  
  // Тут можно отправить в телеграм или на почту
  console.log({ name, email, guests, message })
  
  // Имитация отправки
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true }
}