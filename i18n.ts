import i18n, { Resource, InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'

type Translations = Record<string, any>
type Namespaces = string[]
type LocalesPath = { localesPath?: string }
type Language = 'en' | 'ru'

interface LoadTranslationsParams extends LocalesPath {
  lang: Language
  ns: string
}

interface InitResourcesParams extends LocalesPath {
  languages: Language[]
  namespaces: Namespaces
}

const LOCALES_PATH = 'locales'
const languages: Language[] = ['en', 'ru']
const defaultLanguage: Language = languages[1]

const ERROR_LOAD_TRANSLATIONS = 'Failed to load translations'
const ERROR_FETCH_NAMESPACES = 'Failed to fetch namespaces'
const ERROR_NAMESPACES_NOT_ARRAY = 'Namespaces is not an array'
const ERROR_INITIALIZATION_ABORTED =
  'No namespaces available, initialization aborted'

const logError = (message: string, error?: unknown): void => {
  console.error(error ? `${message}: ${error}` : message)
}

const loadTranslations = async ({
  lang,
  ns,
  localesPath = LOCALES_PATH,
}: LoadTranslationsParams): Promise<Translations> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/loadTranslations?lang=${lang}&ns=${ns}&localesPath=${localesPath}`
    )

    if (!response.ok) throw new Error(ERROR_LOAD_TRANSLATIONS)
    return await response.json()
  } catch (error) {
    logError(`${ERROR_LOAD_TRANSLATIONS} for ${lang}/${ns}`, error)
    return {}
  }
}

const getNamespaces = async ({
  localesPath = LOCALES_PATH,
}: LocalesPath): Promise<Namespaces | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getNamespaces?localesPath=${localesPath}`
    )

    if (!response.ok) {
      throw new Error(`${ERROR_FETCH_NAMESPACES}: ${response.statusText}`)
    }

    const namespaces: Namespaces = await response.json()

    if (!Array.isArray(namespaces)) {
      throw new Error(ERROR_NAMESPACES_NOT_ARRAY)
    }

    return namespaces
  } catch (error) {
    logError(ERROR_FETCH_NAMESPACES, error)
    return null
  }
}

const initResources = async ({
  languages,
  namespaces,
  localesPath = LOCALES_PATH,
}: InitResourcesParams): Promise<Resource> => {
  const loadNamespaceForLang = async (
    lang: Language
  ): Promise<Translations> => {
    const translations = await Promise.all(
      namespaces.map((ns) => loadTranslations({ lang, ns, localesPath }))
    )

    return translations.reduce((acc, nsData, index) => {
      acc[namespaces[index]] = nsData
      return acc
    }, {} as Translations)
  }

  const resources = await Promise.all(
    languages.map(async (lang) => {
      const langResources = await loadNamespaceForLang(lang)
      return { [lang]: langResources }
    })
  )

  return resources.reduce(
    (acc, langData) => ({ ...acc, ...langData }),
    {} as Resource
  )
}

const initI18n = async (): Promise<void> => {
  try {
    const namespaces = await getNamespaces({})

    if (!namespaces) {
      logError(ERROR_INITIALIZATION_ABORTED)
      return
    }

    const resources = await initResources({ languages, namespaces })

    const i18nConfig: InitOptions = {
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      ns: namespaces,
      defaultNS: namespaces[0],
      resources,
      interpolation: {
        escapeValue: false,
      },
    }

    await i18n.use(initReactI18next).init(i18nConfig)

    console.log('i18next initialized with resources:', resources)
  } catch (error) {
    logError('Failed to initialize i18n', error)
  }
}

initI18n()

export default i18n