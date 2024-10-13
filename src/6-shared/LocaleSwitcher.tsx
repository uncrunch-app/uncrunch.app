'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '../i18n/config'
import { setUserLocale } from './services/locale'
import { Select, SelectItem, Selection } from '@nextui-org/react'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  const langs = [
    {
      key: 'en',
      label: 'EN',
    },
    {
      key: 'ru',
      label: 'RU',
    },
  ]

  const handleChange = (selectedKey: Selection) => {
    const locale = Array.from(selectedKey).join('') as Locale
    setUserLocale(locale)
  }

  return (
    <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
      <Select
        labelPlacement="outside-left"
        label="d"
        variant="bordered"
        defaultSelectedKeys={[locale]}
        className="boredr-divider w-[90px] items-center"
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
    </div>
  )
}
