import prettierPluginSortImports from '@ianvs/prettier-plugin-sort-imports';

/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  semi: true,
  jsxSingleQuote: true,
  plugins: [prettierPluginSortImports],
  importOrder: [
    '^react$',
    '^next$',
    '^[.]',
    '<THIRD_PARTY_MODULES>',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};
