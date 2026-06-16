import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS変数をTailwindに橋渡し
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
      },
      maxWidth: {
        page: 'var(--content-max-width)',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
