import antfu from '@antfu/eslint-config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tailwind from 'eslint-plugin-tailwindcss';

export default antfu({
  react: true,
  stylistic: false,
})
  .append(eslintPluginPrettierRecommended)
  .append(tailwind.configs['flat/recommended'], {
    settings: {
      tailwindcss: {
        config: './apps/desktop/tailwind.config.js',
      },
    },
  })
  .append({ ignores: ['database.type.ts'] });
