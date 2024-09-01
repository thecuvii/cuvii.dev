import config from '@zolplay/eslint-config'

export default config.append({
  settings: {
    tailwindcss: {
      // path to your tailwind config
      config: './tailwind.config.ts',
    },
  },
})
