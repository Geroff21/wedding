// app/actions/rsvp.ts
'use server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function submitRSVP(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const guests = formData.get('guests')
  const message = formData.get('message')
  const dietary = formData.get('dietary_restrictions')
  const alcoholPreferences = formData.getAll('alcohol')
  
  try {
    let alcoholText = 'Не выбрано'
    if (alcoholPreferences.length > 0) {
      const alcoholMap: Record<string, string> = {
        'vodka': '🥃 Водка',
        'wine': '🍷 Вино',
        'champagne': '🍾 Шампанское',
        'whiskey': '🥃 Виски',
        'non_alcoholic': '🚫 Безалкогольное'
      }
      
      alcoholText = alcoholPreferences
        .map(pref => alcoholMap[pref.toString()] || pref)
        .join(', \n \t \t')
    }

    const text = `
    <b>Новая заявка RSVP</b>

    <b>Имя:</b> ${name}
    <b>Email:</b> ${email}
    <b>Гостей:</b> ${guests || 1}

    <b>Предпочтения по алкоголю:</b>
    ${alcoholText}

    <b>Аллергии/Особые пожелания:</b>
    ${dietary || 'Нет'}

    <b>Дополнительно:</b>
    ${message || 'Нет'}
    `.trim()

    console.log('Sending to Telegram:', { name, email, guests, alcoholPreferences, dietary, message })

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    })

    const result = await response.json()
    
    if (!response.ok) {
      console.error('Telegram API error:', result)
      throw new Error(`Failed to send Telegram message: ${result.description || 'Unknown error'}`)
    }

    return { success: true }
    
  } catch (error) {
    console.error('Error sending RSVP:', error)
    return { 
      success: false, 
      error: 'Не удалось отправить заявку. Попробуйте позже.' 
    }
     
  }
}