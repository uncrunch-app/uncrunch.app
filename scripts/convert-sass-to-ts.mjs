import * as sass from 'sass';
import fs from 'fs/promises';
import path from 'path';

/**
 * Определяет тип переменной на основе её значения.
 *
 * @param value Значение переменной.
 * @returns Тип переменной: 'string' или 'number'.
 */
const determineType = (value) => {
  return isNaN(value) ? 'string' : 'number';
};

/**
 * Конвертирует SCSS переменные в TypeScript файл.
 *
 * @param {string} sassFilePath Путь к файлу SCSS, содержащему переменные.
 * @param {string} tsOutputPath Путь к выходному файлу TypeScript.
 */
const convertSassToTs = async (sassFilePath, tsOutputPath) => {
  try {
    const result = sass.compile(sassFilePath);
    const cssContent = result.css.toString();

    const variableRegex = /--([\w-]+):\s*([^;]+);/g;

    const variables = [];
    let match;
    while ((match = variableRegex.exec(cssContent)) !== null) {
      const value = match[2].trim();
      const type = determineType(value);
      variables.push({ name: match[1], value, type });
    }

    const tsContent = variables
      .map(
        (variable) =>
          `export const ${variable.name.toUpperCase().replace(/-/g, '_')}: ${variable.type} = ${variable.type === 'number' ? Number(variable.value) : `'${variable.value}'`};`
      )
      .join('\n');

    await fs.writeFile(tsOutputPath, tsContent);
    console.info(`SCSS переменные успешно конвертированы в ${tsOutputPath}`);
  } catch (error) {
    console.error('Ошибка при конвертации SCSS переменных:', error);
  }
};

// Получение путей из аргументов командной строки
const args = process.argv.slice(2);
const sassFilePath = path.resolve(args[0]);
const tsOutputPath = path.resolve(args[1]);

convertSassToTs(sassFilePath, tsOutputPath);
