import fs from 'fs'
import path from 'path'

describe('Проверка локализации', () => {
  const baseLang: string = process.env.LOCALES_BASE_LANG || 'en'
  const localesDirName: string = process.env.LOCALES_DIR || 'locales'
  const localesDir: string = path.join(__dirname, '..', localesDirName)

  if (!fs.existsSync(localesDir)) {
    throw new Error(`Директория локализаций не найдена по пути: ${localesDir}`)
  }

  const languageDirs: string[] = fs
    .readdirSync(localesDir)
    .filter((dir: string) =>
      fs.statSync(path.join(localesDir, dir)).isDirectory()
    )

  if (!languageDirs.includes(baseLang)) {
    throw new Error(`Базовый язык '${baseLang}' не найден среди локализаций`)
  }

  const getFileList = (lang: string): string[] =>
    fs
      .readdirSync(path.join(localesDir, lang))
      .filter((file: string) =>
        fs.statSync(path.join(localesDir, lang, file)).isFile()
      )
      .sort()

  const baseFiles: string[] = getFileList(baseLang)

  describe('Проверка наличия одинаковых файлов во всех языковых каталогах', () => {
    languageDirs
      .filter((lang: string) => lang !== baseLang)
      .forEach((lang: string) => {
        const langFiles: string[] = getFileList(lang)

        describe(`Сравнение '${lang}' с базовым языком '${baseLang}'`, () => {
          test('Должно быть одинаковое количество файлов', () => {
            expect(langFiles.length).toBe(baseFiles.length)
          })

          test('Имена файлов должны быть идентичны', () => {
            expect(langFiles).toEqual(baseFiles)
          })
        })
      })
  })

  describe('Проверка консистентности ключей и динамических переменных', () => {
    baseFiles.forEach((fileName: string) => {
      const baseFilePath = path.join(localesDir, baseLang, fileName)
      const baseFileContent = fs.readFileSync(baseFilePath, 'utf-8')
      let baseJson: Record<string, any>

      try {
        baseJson = JSON.parse(baseFileContent)
      } catch (error) {
        throw new Error(
          `Ошибка парсинга JSON в файле ${baseFilePath}: ${error}`
        )
      }

      const baseKeys = Object.keys(baseJson).sort()

      languageDirs
        .filter((lang: string) => lang !== baseLang)
        .forEach((lang: string) => {
          const langFilePath = path.join(localesDir, lang, fileName)

          if (!fs.existsSync(langFilePath)) {
            throw new Error(`Файл ${langFilePath} не найден`)
          }

          const langFileContent = fs.readFileSync(langFilePath, 'utf-8')
          let langJson: Record<string, any>

          try {
            langJson = JSON.parse(langFileContent)
          } catch (error) {
            throw new Error(
              `Ошибка парсинга JSON в файле ${langFilePath}: ${error}`
            )
          }

          const langKeys = Object.keys(langJson).sort()

          describe(`Сравнение файла '${fileName}' для языка '${lang}' с базовым языком '${baseLang}'`, () => {
            test('Должно быть одинаковое количество ключей', () => {
              expect(langKeys.length).toBe(baseKeys.length)
            })

            test('Имена ключей должны быть идентичны', () => {
              expect(langKeys).toEqual(baseKeys)
            })

            test('Динамические переменные в значениях ключей должны совпадать', () => {
              baseKeys.forEach((key) => {
                const baseValue = baseJson[key]
                const langValue = langJson[key]

                if (
                  typeof baseValue !== 'string' ||
                  typeof langValue !== 'string'
                ) {
                  throw new Error(
                    `Значения ключа '${key}' должны быть строками в файлах ${baseFilePath} и ${langFilePath}`
                  )
                }

                const extractVariables = (text: string): string[] => {
                  const regex = /{{\s*[\w\.]+\s*}}/g
                  const matches = text.match(regex)
                  return matches ? matches.map((v) => v.trim()).sort() : []
                }

                const baseVariables = extractVariables(baseValue)
                const langVariables = extractVariables(langValue)

                expect(langVariables).toEqual(baseVariables)
              })
            })
          })
        })
    })
  })
})
