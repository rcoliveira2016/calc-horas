// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "reka-ui/nuxt", "@pinia/nuxt"],
  app: {
    head: {
      title: "Calc Horas",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "Calc Horas" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    githubClientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    public: {
      githubClientId: process.env.NUXT_PUBLIC_GITHUB_CLIENT_ID,
      baseURL: `http://localhost:${process.env.PORT || 3000}`,
    },
  },
});
