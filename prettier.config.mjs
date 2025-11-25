/** @type {import('prettier').Config} */
export default {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  jsxSingleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto',
  plugins: ['prettier-oxc-parser', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tv'],
}
