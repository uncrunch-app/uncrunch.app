//'use client';

//import React from 'react';
//import { useLocale, useTranslations } from 'next-intl';
//import { Locale } from '../i18n/config';
//import { setUserLocale } from './services/locale';
//import { SelectChangeEvent } from '@mui/material/Select';
//import Select from './ui/Select';

//export default function LocaleSwitcher() {
//  const t = useTranslations('LocaleSwitcher');
//  const locale = useLocale();

//  const items = [
//    {
//      value: 'en',
//      label: t('en'),
//    },
//    {
//      value: 'ru',
//      label: t('ru'),
//    },
//  ];

//  const handleChange = (event: SelectChangeEvent<string>) => {
//    const value = event.target.value;
//    const locale = value as Locale;
//    setUserLocale(locale);
//  };

//  return (
//    <Select
//      value={locale}
//      onChange={handleChange}
//      options={items}
//    />
//  );
//}
