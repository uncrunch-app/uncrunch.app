'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { saveUserLocale } from '../services/localeCookies'
import { Locale } from '@/i18n/config'

interface LanguageOption {
  key: Locale
  label: string
}

export default function LocaleSwitcher() {
  const t = useTranslations('Components.localeSwitcher')
  const currentLocale = useLocale()

  const langs: LanguageOption[] = [
    {
      key: 'en-US',
      label: t('en-US'),
    },
    {
      key: 'ru-RU',
      label: t('ru-RU'),
    },
  ]

  const handleChange = async (selectedKey: Selection) => {
    const locale = Array.from(selectedKey).join('') as Locale
    await saveUserLocale(locale)
  }

  return (
    <Select
      labelPlacement="outside-left"
      label={t('label')}
      variant="bordered"
      selectedKeys={[currentLocale]}
      className="items-center border-divider"
      classNames={{
        trigger:
          'text-default-600 data-[open=true]:border-default-600 border-small rounded-small',
        value: 'group-data-[has-value=true]:text-default-800',
        popoverContent: 'rounded-medium bg-content1 shadow-small',
      }}
      onSelectionChange={handleChange}
    >
      {langs.map((lang) => (
        <SelectItem key={lang.key}>{lang.label}</SelectItem>
      ))}
    </Select>
  )
}
