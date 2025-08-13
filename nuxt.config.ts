import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt'],
  css: ['./app/assets/css/tailwind.css'],
  alias: {
    '@': '.',
    '~/app': './app'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      global: true
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
      global: true
    }
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  }
})
