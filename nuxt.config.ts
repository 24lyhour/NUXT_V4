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
  components: {
    dirs: [
      {
        path: '~/app/components',
        pathPrefix: false
      }
    ]
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  }
})
