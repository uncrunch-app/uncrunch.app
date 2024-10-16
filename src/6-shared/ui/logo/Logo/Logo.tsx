import React from 'react'
import styles from './Logo.module.scss'
import * as COLOR from '@/src/6-shared/constants/colors'
import {commonColors, semanticColors, colors} from "@nextui-org/theme";

interface LogoProps {
  width?: string
  height?: string
  color?: string
  bgColor?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
}

const INIT_SVG_SIZE = 512

const parseSize = (size: string): number => {
  return parseFloat(size.replace(/[^0-9]/g, ''))
}

/**
 * @prop {string} `width` - Ширина SVG. @default 512px
 * @prop {string} `height` - Высота SVG. @default 512px
 * @prop {string} `color` - Цвет заливки элемента path. @default #EAD2C6
 * @prop {string} `bgColor` - Цвет заливки элемента rect. @default #44564A
 * @prop {string} `borderColor` - Цвет обводки элемента rect. @default none
 * @prop {string} `borderWidth` - Ширина обводки элемента rect. @default 0
 * @prop {string} `borderRadius` - Радиус скругления углов элемента rect. @default 0
 */
const Logo: React.FC<LogoProps> = ({
  width = `${INIT_SVG_SIZE}px`,
  height = `${INIT_SVG_SIZE}px`,
  color = COLOR.CREAM,
  bgColor = COLOR.GREEN_500,
  borderColor = 'none',
  borderWidth = '0',
  borderRadius = '0',
}) => {
  const numericBorderWidth = parseSize(borderWidth)
  const adjustedWidth = INIT_SVG_SIZE - numericBorderWidth
  const adjustedHeight = INIT_SVG_SIZE - numericBorderWidth
  const halfBorderWidth = numericBorderWidth / 2
  
  //console.log(semanticColors);
  

  return (
    <svg
      className={styles.logoContainer}
      width={width}
      height={height}
      viewBox={`0 0 ${INIT_SVG_SIZE} ${INIT_SVG_SIZE}`}
      style={
        {
          '--logo-width': width,
          '--logo-height': height,
          '--logo-color': 'hsl(var(--nextui-default))',
          '--logo-bg-color': 'hsl(var(--nextui-primary))',
          '--logo-border-color': borderColor,
          '--logo-border-width': borderWidth,
          '--logo-border-radius': borderRadius,
        } as React.CSSProperties
      }
    >
      <rect
        x={halfBorderWidth}
        y={halfBorderWidth}
        width={adjustedWidth}
        height={adjustedHeight}
        rx={borderRadius}
        ry={borderRadius}
      />
      <path d="M240.4 159V341H162L161.16 321.12C169 310.2 183 278.28 188.88 243.84L174.88 242.44C162.56 309.36 134.28 345.48 96.76 345.48C60.36 345.48 41.6 319.16 41.6 271.84V159H120V271.84C120 290.88 122.52 301.24 132.04 301.24C150.52 301.24 162 250.56 162 159H240.4ZM268.313 341V159H346.713L347.553 178.88C339.713 189.8 325.713 221.72 319.833 256.16L333.833 257.56C346.153 190.64 374.433 154.52 411.953 154.52C448.353 154.52 467.113 180.84 467.113 228.16V341H388.713V228.16C388.713 209.12 386.193 198.76 376.673 198.76C358.193 198.76 346.713 249.44 346.713 341H268.313Z" />
    </svg>
  )
}

export default Logo
