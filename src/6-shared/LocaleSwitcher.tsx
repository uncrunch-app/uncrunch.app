'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '../i18n/config'
import { saveUserLocale } from './services/locale'
import { Select, SelectItem, Selection } from '@nextui-org/react'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const currentLocale = useLocale()

  const langs = [
    {
      key: 'en',
      label: t('en'),
    },
    {
      key: 'ru',
      label: t('ru'),
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
      className="border-divider items-center"
      classNames={{
        trigger:
          'text-default-600 data-[open=true]:border-default-600 data-[focus=true]:border-default-600 border-small rounded-small',
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
