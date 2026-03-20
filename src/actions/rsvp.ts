// app/actions/rsvp.ts
'use server'

import fs from 'fs/promises'
import path from 'path'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

const RSVP_DATA_PATH = path.join(process.cwd(), 'rsvp-data.json')

export async function submitRSVP(formData: FormData) {
  const name = formData.get('name')
  const phone = formData.get('phone')
  const guests = formData.get('guests')
  const message = formData.get('message')
  const dietary = formData.get('dietary_restrictions')
  const alcoholPreferences = formData.getAll('alcohol')
  const otherAlcohol = formData.get('other_alcohol')

  const rsvpEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    name,
    phone,
    guests: guests || '1',
    message: message || '',
    dietary: dietary || '',
    alcoholPreferences: alcoholPreferences.map(p => p.toString()),
    otherAlcohol: otherAlcohol || '',
  }
  
  try {

    let existingData = []
    try {
      const fileContent = await fs.readFile(RSVP_DATA_PATH, 'utf-8')
      existingData = JSON.parse(fileContent)
    } catch (error) {}
    
    existingData.push(rsvpEntry)
    await fs.writeFile(RSVP_DATA_PATH, JSON.stringify(existingData, null, 2))
    console.log(`✅ RSVP saved to file: ${name} (${phone})`)
    
    let alcoholText = 'Не выбрано'
    
    if (alcoholPreferences.length > 0) {
      const alcoholMap: Record<string, string> = {
        'vodka': '🥃 Водка',
        'whiskey': '🥃 Виски',
        'cognac': '🥃 Коньяк',
        'brandy': '🥃 Бренди',
        'rum': '🥃 Ром',
        'gin': '🥃 Джин',
        'tequila': '🥃 Текила',
        'red_dry': '🍷 Красное сухое',
        'red_semi_sweet': '🍷 Красное полусладкое',
        'white_dry': '🍷 Белое сухое',
        'white_semi_dry': '🍷 Белое полусухое',
        'white_semi_sweet': '🍷 Белое полусладкое',
        'rose': '🍷 Розовое',
        'champagne': '🍾 Шампанское',
        'sparkling': '🍾 Игристое',
        'beer': '🍺 Пиво',
        'cocktails': '🍸 Коктейли',
        'liqueur': '🍹 Ликер',
        'non_alcoholic': '🚫 Не пью алкоголь',
        'other_custom': '✏️ Другое'
      }
      
      alcoholText = alcoholPreferences
        .map(pref => {
          const prefStr = pref.toString()
          return alcoholMap[prefStr] || prefStr
        })
        .join(', \n')
      
      if (alcoholPreferences.includes('other_custom') && otherAlcohol) {
        alcoholText += `\n   Другое - ${otherAlcohol}`
      }
    }

    const text = `
<b>Новая заявка RSVP</b>

<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Количество гостей:</b> ${guests || 1}

<b>Предпочтения по алкоголю:</b>
${alcoholText}

<b>Аллергии и особые пожелания по еде:</b>
${dietary || 'Не указано'}

<b>Дополнительные пожелания:</b>
${message || 'Не указано'}

${new Date().toLocaleString('ru-RU', { 
  day: 'numeric', 
  month: 'long', 
  hour: '2-digit', 
  minute: '2-digit' 
})}
    `.trim()

    let telegramSuccess = false
    try {
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
        signal: AbortSignal.timeout(10000),
      })

      const result = await response.json()
      
      if (response.ok) {
        telegramSuccess = true
      } else {
        console.error('Telegram API error:', result)
      }
    } catch (telegramError) {
      console.error('Telegram send failed, but data saved to file:', telegramError)
    }

    return { 
      success: true,
      telegramSent: telegramSuccess,
      message: telegramSuccess 
        ? 'Заявка отправлена!' 
        : 'Заявка сохранена! Уведомление в Telegram временно недоступно.'
    }
    
  } catch (error) {
    console.error('Error saving RSVP:', error)
    return { 
      success: false, 
      error: 'Не удалось отправить заявку. Попробуйте позже.' 
    }
  }
}