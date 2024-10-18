import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "srcDir/pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "srcDir/components/**/*.{vue,js,jsx,mjs,ts,tsx}",
  ],
  theme: {    
    extend: {
      colors: {
        primary: "#61A0AF",
        secondary: "#96C9DC",
      },
    },
  },
  prefix: "tw-",
};
