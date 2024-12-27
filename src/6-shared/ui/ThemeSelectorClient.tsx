// src/app/components/ThemeSelector.tsx
'use client'

import { useState } from 'react'
import { RadioGroup, Radio } from '@nextui-org/react'
import { ThemeNames, themeNames, themes } from '../themes/themeSettings'
import { saveThemeMode } from '../services/themeCookies'
import { toTitleCase } from '../utils/toTitleCase'

interface ThemeSelectorClientProps {
  initialTheme: ThemeNames
}

// LightThemeSquare.tsx
export const LightThemeSquare = () => (
  <div className="mb-2 h-[120px] w-[180px] rounded-medium bg-white"></div>
)

// DarkThemeSquare.tsx
export const DarkThemeSquare = () => (
  <div className="mb-2 h-[120px] w-[180px] rounded-medium bg-black"></div>
)

// ClassicLightThemeSquare.tsx
export const ClassicLightThemeSquare = () => (
  <div className="mb-2 h-[120px] w-[180px] rounded-medium bg-green-500"></div>
)

// OtherThemeSquare.tsx
export const OtherThemeSquare = () => (
  <div className="mb-2 h-[120px] w-[180px] rounded-medium bg-blue-500"></div>
)

const themeComponents: { [key: string]: JSX.Element } = {
  light: <LightThemeSquare />,
  dark: <DarkThemeSquare />,
  'classic-light': <ClassicLightThemeSquare />,
}

const renderColoredSquare = (themeOption: string) => {
  return themeComponents[themeOption] || <OtherThemeSquare />
}

export default function ThemeSelectorClient({
  initialTheme,
}: ThemeSelectorClientProps) {
  const [theme, setTheme] = useState<string>(initialTheme)

  const handleThemeChange = (newTheme: ThemeNames) => {
      setTheme(newTheme)
      saveThemeMode(newTheme)
  }

  return (
    <div className="rounded-large border-small border-divider bg-secondary-200 p-4">
      <RadioGroup
        label="Выберите тему:"
        value={theme}
        onValueChange={(value) => handleThemeChange(value as ThemeNames)}
        orientation="horizontal"
        color="default"
        size="md"
      >
        {themeNames.map((themeOption) => (
          <div
            key={themeOption}
            className="m-2 flex flex-col items-start justify-center rounded-large border border-divider p-3"
          >
            {renderColoredSquare(themeOption)}
            <Radio value={themeOption} classNames={{ base: 'p-3 -m-0' }}>
              {toTitleCase(themeOption)}
            </Radio>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
