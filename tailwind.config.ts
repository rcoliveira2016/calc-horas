import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    'srcDir/pages/**/*.{vue,js,jsx,mjs,ts,tsx}',
    'srcDir/components/**/*.{vue,js,jsx,mjs,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#61A0AF',
        secondary: '#96C9DC',
      },
      backgroundColor: {
        'body-dark': '#1e293b', // Cor de fundo escura
      },
      textColor: {
        'body-light': '#ffffff', // Cor do texto clara
      },
    },
  },
  prefix: 'tw-',
}
