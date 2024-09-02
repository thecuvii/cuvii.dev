import type { Config } from 'tailwindcss'

import prose from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [prose],
  theme: {
    extend: {
      colors: {
        theme: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
      },
    },
  },
}
export default config
