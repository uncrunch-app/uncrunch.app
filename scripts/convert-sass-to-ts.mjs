import * as sass from 'sass'
import fs from 'fs/promises'
import path from 'path'

/**
 * Определяет тип переменной на основе её значения.
 *
 * @param value Значение переменной.
 * @returns Тип переменной: 'string' или 'number'.
 */
const determineType = (value) => {
  return isNaN(value) ? 'string' : 'number'
}

/**
 * Конвертирует SCSS и CSS переменные в TypeScript файл.
 *
 * @param {string} sassFilePath Путь к файлу SCSS, содержащему переменные.
 * @param {string} tsOutputPath Путь к выходному файлу TypeScript.
 */
const convertSassToTs = async (sassFilePath, tsOutputPath) => {
  try {
    // Чтение исходного файла SCSS
    const sassContent = await fs.readFile(sassFilePath, 'utf-8')

    // Компиляция SCSS в CSS
    const result = sass.compile(sassFilePath)
    const cssContent = result.css.toString()

    // Регулярное выражение для поиска SCSS переменных ($var) в исходном файле
    const scssVariableRegex = /\$([\w-]+):\s*([^;]+);/g
    const cssVariableRegex = /--([\w-]+):\s*([^;]+);/g

    const variables = []

    // Извлечение SCSS переменных из исходного SCSS-файла
    let match
    while ((match = scssVariableRegex.exec(sassContent)) !== null) {
      const name = match[1].trim()
      const value = match[2].trim()
      const type = determineType(value)
      variables.push({ name, value, type })
    }

    // Извлечение CSS переменных из скомпилированного CSS
    while ((match = cssVariableRegex.exec(cssContent)) !== null) {
      const name = match[1].trim()
      const value = match[2].trim()
      const type = determineType(value)
      variables.push({ name, value, type })
    }

    // Генерация TypeScript содержимого
    const tsContent = variables
      .map(
        (variable) =>
          `export const ${variable.name.toUpperCase().replace(/-/g, '_')}: ${variable.type} = ${variable.type === 'number' ? Number(variable.value) : `'${variable.value}'`};`
      )
      .join('\n')

    await fs.writeFile(tsOutputPath, tsContent)
    console.info(
      `SCSS и CSS переменные успешно конвертированы в ${tsOutputPath}`
    )
  } catch (error) {
    console.error('Ошибка при конвертации переменных:', error)
  }
}

// Получение путей из аргументов командной строки
const args = process.argv.slice(2)
const sassFilePath = path.resolve(args[0])
const tsOutputPath = path.resolve(args[1])

convertSassToTs(sassFilePath, tsOutputPath)
