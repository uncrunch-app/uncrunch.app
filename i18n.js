import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const languages = ['en', 'ru']

// Функция для загрузки переводов с параметром localesPath
const loadTranslations = async (lang, ns, localesPath) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/loadTranslations?lang=${lang}&ns=${ns}&localesPath=${localesPath}`
    )

    if (!response.ok) throw new Error('Failed to load translations')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error loading translations for ${lang}/${ns}:`, error)
    throw error
  }
}

// Функция для инициализации i18n с параметром localesPath
const initI18n = async (localesPath = 'locales') => {
  // Проброс localesPath в запрос к getNamespaces
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getNamespaces?localesPath=${localesPath}`
  )

  if (!response.ok) {
    console.error('Failed to fetch namespaces:', response.statusText)
    return
  }

  const namespaces = await response.json()

  if (!Array.isArray(namespaces)) {
    console.error('Namespaces is not an array:', namespaces)
    return
  }

  const resources = {}

  // Инициализация ресурсов для каждого языка
  for (const lang of languages) {
    resources[lang] = {}
    for (const ns of namespaces) {
      try {
        resources[lang][ns] = await loadTranslations(lang, ns, localesPath)
      } catch (error) {
        console.error(`Failed to load translations for ${lang}/${ns}:`, error)
      }
    }
  }

  // Использование первого значения из массивов languages и namespaces
  const defaultLanguage = languages[0]
  const defaultNamespace = namespaces[0]

  await i18n.use(initReactI18next).init({
    lng: defaultLanguage, // Первый язык из коллекции
    fallbackLng: defaultLanguage, // Первый язык как fallback
    ns: namespaces,
    defaultNS: defaultNamespace, // Первый неймспейс как defaultNS
    resources,
    interpolation: {
      escapeValue: false,
    },
  })

  console.log('i18next initialized with resources:', resources)
}

initI18n().catch((error) => console.error('Failed to initialize i18n:', error))

export default i18n
