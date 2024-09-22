import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // Получаем путь к директории локализаций из параметров запроса
  const localesPath = searchParams.get('localesPath') || 'locales' // Если не передан, по умолчанию 'locales'

  const translationsPath = path.join(process.cwd(), localesPath)

  // Проверяем, существует ли директория
  if (!fs.existsSync(translationsPath)) {
    console.error('Translations directory not found:', translationsPath)
    return NextResponse.json(
      { error: 'Translations directory not found' },
      { status: 404 }
    )
  }

  try {
    const files = await fs.promises.readdir(translationsPath)
    console.log('Languages found in translations directory:', files)

    const namespacesMap: { [key: string]: string[] } = {} // Объект для хранения неймспейсов для каждого языка

    for (const langDir of files) {
      const langDirPath = path.join(translationsPath, langDir)
      if (fs.statSync(langDirPath).isDirectory()) {
        const langFiles = fs
          .readdirSync(langDirPath)
          .filter((file) => file.endsWith('.json'))
          .map((file) => file.replace('.json', ''))

        console.log(`Namespaces for language ${langDir}:`, langFiles)
        namespacesMap[langDir] = langFiles // Сохраняем неймспейсы в объект
      }
    }

    // Получаем все неймспейсы
    const allNamespaces = Object.values(namespacesMap)
    const firstLangNamespaces = allNamespaces[0]

    // Проверяем количество неймспейсов и их имена
    const allMatch =
      allNamespaces.every((ns) => ns.length === firstLangNamespaces.length) &&
      allNamespaces.every((ns) =>
        ns.every((n) => firstLangNamespaces.includes(n))
      )

    if (allMatch) {
      const uniqueNamespaces = new Set<string>()
      allNamespaces.flat().forEach((ns) => uniqueNamespaces.add(ns)) // Уникальные неймспейсы

      console.log('Unique namespaces:', Array.from(uniqueNamespaces))
      return NextResponse.json(Array.from(uniqueNamespaces)) // Возвращаем уникальные неймспейсы
    } else {
      const errorMessages: string[] = [] // Указываем тип как string[]

      // Проверяем количество неймспейсов
      allNamespaces.forEach((ns, index) => {
        if (ns.length !== firstLangNamespaces.length) {
          errorMessages.push(
            `Language ${files[index]} has ${ns.length} namespaces (expected ${firstLangNamespaces.length})`
          )
        }
      })

      // Проверяем имена неймспейсов
      allNamespaces.forEach((ns, index) => {
        const mismatchedNamespaces = ns.filter(
          (n) => !firstLangNamespaces.includes(n)
        )
        if (mismatchedNamespaces.length > 0) {
          errorMessages.push(
            `Language ${files[index]} has mismatched namespaces: ${mismatchedNamespaces.join(', ')}`
          )
        }
      })

      console.error('Mismatch in namespaces between languages:', errorMessages)
      return NextResponse.json(
        { error: errorMessages.join(' | ') },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error reading translations directory:', error)
    return NextResponse.json(
      { error: 'Failed to read directory' },
      { status: 500 }
    )
  }
}
