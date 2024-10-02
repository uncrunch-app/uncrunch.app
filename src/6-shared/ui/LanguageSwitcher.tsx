'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { SelectChangeEvent } from '@mui/material/Select'
import Select from './Select'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<string>(() =>
    getInitialLanguage(i18n)
  )

  console.log(i18n.options.lng, i18n.language)

  function getInitialLanguage(i18n: any): string {
    if (i18n.language) {
      return i18n.language
    }

    if (i18n.options.lng) {
      return i18n.options.lng
    }

    if (
      Array.isArray(i18n.options.fallbackLng) &&
      i18n.options.fallbackLng.length > 0
    ) {
      return i18n.options.fallbackLng[0]
    }

    throw new Error('Не удалось установить язык. Все источники отсутствуют.')
  }

  // Массив с опциями языков
  const languageOptions = [
    { value: 'en', label: 'EN' },
    { value: 'ru', label: 'RU' },
  ]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    Cookies.set('i18next', lng)
  }

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value
    setLanguage(selectedLanguage)
    changeLanguage(selectedLanguage)
  }

  // Устанавливаем язык при монтировании компонента
  useEffect(() => {
    const savedLanguage = Cookies.get('i18next')
    if (savedLanguage) {
      setLanguage(savedLanguage)
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  return (
    <Select
      value={language}
      onChange={handleLanguageChange}
      options={languageOptions} // Передаем список опций
    />
  )
}

export default LanguageSwitcher
