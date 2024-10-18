// src/app/components/ThemeSelector.tsx
'use client'

import { useState } from 'react'
import { RadioGroup, Radio } from '@nextui-org/radio'
import { themes } from '../themes/themeSettings'
import { DEFAULT_THEME } from '../constants/constants'
import { saveThemeMode } from '../utils/themeCookies'

interface ThemeSelectorClientProps {
  initialTheme: string
}

// LightThemeSquare.tsx
export const LightThemeSquare = () => (
  <div className="w-[180px] h-[120px] rounded-medium bg-white mb-2">
  </div>
);

// DarkThemeSquare.tsx
export const DarkThemeSquare = () => (
  <div className="w-[180px] h-[120px] rounded-medium bg-black mb-2">
  </div>
);

// ClassicLightThemeSquare.tsx
export const ClassicLightThemeSquare = () => (
  <div className="w-[180px] h-[120px] rounded-medium bg-green-500 mb-2">
  </div>
);

// OtherThemeSquare.tsx
export const OtherThemeSquare = () => (
  <div className="w-[180px] h-[120px] rounded-medium bg-blue-500 mb-2">
  </div>
);


const themeComponents: { [key: string]: JSX.Element } = {
  light: <LightThemeSquare />,
  dark: <DarkThemeSquare />,
  'classic-light': <ClassicLightThemeSquare />,
};

const renderColoredSquare = (themeOption: string) => {
  return themeComponents[themeOption] || <OtherThemeSquare />;
};

export default function ThemeSelectorClient({ initialTheme }: ThemeSelectorClientProps) {
  const [theme, setTheme] = useState<string>(initialTheme || DEFAULT_THEME);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    saveThemeMode(newTheme);
  };

  const themeNames = Object.keys(themes);

  return (
    <div className='bg-secondary-200 border-divider border-small rounded-large p-4'>
      <RadioGroup
        label="Выберите тему:"
        value={theme}
        onValueChange={handleThemeChange}
        orientation="horizontal"
        color="default"
        size="md"
      >
        {themeNames.map((themeOption) => (
          <div
            key={themeOption}
            className="flex flex-col items-start justify-center border border-divider rounded-large p-3 m-2"
          >
            {renderColoredSquare(themeOption)}
            <Radio value={themeOption} classNames={{ base: 'p-3 -m-0' }}>
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </Radio>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}