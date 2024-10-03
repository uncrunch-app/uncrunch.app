'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getClientTheme } from '../utils/getClientTheme'
import { themes } from '../utils/themeSettings'
import { RadioGroup, Radio } from '@nextui-org/radio'
import styles from './ThemeSelector.module.css' // Импортируем стили
import cn from 'classnames'

export default function ThemeSelector({
  initialTheme,
}: {
  initialTheme?: string
}) {
  const themeNames = Object.keys(themes) // Получаем все доступные имена тем
  const [theme, setTheme] = useState<string>(initialTheme || getClientTheme())

  useEffect(() => {
    // Применяем выбранную тему к корневому элементу
    document.documentElement.className = theme
    // Сохраняем выбранную тему в куках
    Cookies.set('theme', theme, { expires: 365 })
  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  return (
    <div className={cn(styles.container)}>
      <RadioGroup
        label="Выберите тему:"
        value={theme}
        onValueChange={handleThemeChange}
        orientation="vertical"
        color="primary"
        classNames={{
          base: styles.radioBase,
          label: styles.radioLabel,
          description: styles.radioDescription,
          errorMessage: styles.radioErrorMessage,
          wrapper: styles.radioWrapper,
        }}
        size="md"
      >
        {themeNames.map((themeOption) => (
          <Radio
            key={themeOption}
            value={themeOption}
            classNames={{
              base: cn(
                'data-[selected=true]:border-background data-[hover=true]:border-primary'
              ),
              wrapper: cn(
                'border-foreground data-[hover-unselected=true]:bg-foreground data-[hover=true]:bg-foreground'
              ),
              control: cn(
                'border-foreground data-[hover-unselected=true]:bg-foreground data-[hover=true]:bg-foreground'
              ),
            }}
            //classNames={{
            //  base: styles.radioButtonBase,
            //  label: styles.radioButtonLabel,
            //  description: styles.radioButtonDescription,
            //  wrapper: styles.radioButtonWrapper,
            //  labelWrapper: styles.radioButtonLabelWrapper,
            //  control: styles.radioButtonControl,
            //}}
          >
            {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}
