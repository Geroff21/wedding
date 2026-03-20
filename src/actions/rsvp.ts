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
  const otherAlcohol = formData.get('other_alcohol')
  
  try {
    let alcoholText = 'Не выбрано'
    
    if (alcoholPreferences.length > 0) {
      // Расширенная карта соответствия для всех видов алкоголя
      const alcoholMap: Record<string, string> = {
        // Крепкие напитки
        'vodka': '🥃 Водка',
        'whiskey': '🥃 Виски',
        'cognac': '🥃 Коньяк',
        'brandy': '🥃 Бренди',
        'rum': '🥃 Ром',
        'gin': '🥃 Джин',
        'tequila': '🥃 Текила',
        
        // Вина
        'red_dry': '🍷 Красное сухое',
        'red_semi_sweet': '🍷 Красное полусладкое',
        'white_dry': '🍷 Белое сухое',
        'white_semi_dry': '🍷 Белое полусухое',
        'white_semi_sweet': '🍷 Белое полусладкое',
        'rose': '🍷 Розовое',
        'champagne': '🍾 Шампанское',
        'sparkling': '🍾 Игристое',
        
        // Другие напитки
        'beer': '🍺 Пиво',
        'cocktails': '🍸 Коктейли',
        'liqueur': '🍹 Ликер',
        
        // Безалкогольное
        'non_alcoholic': '🚫 Не пью алкоголь',
        
        // Другое
        'other_custom': '✏️ Другое'
      }
      
      // Формируем текст с алкогольными предпочтениями
      alcoholText = alcoholPreferences
        .map(pref => {
          const prefStr = pref.toString()
          return alcoholMap[prefStr] || prefStr
        })
        .join(', \n')
      
      // Если выбрано "Другое" и есть текст, добавляем его
      if (alcoholPreferences.includes('other_custom') && otherAlcohol) {
        alcoholText += `\n   Другое - ${otherAlcohol}`
      }
    }

    const text = `
<b>Новая заявка RSVP</b>

<b>Имя:</b> ${name}
<b>Телефон:</b> ${email}
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