import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default antfu(
  {
    react: true,
    nextjs: true,
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
)
