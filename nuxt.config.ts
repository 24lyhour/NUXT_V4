import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', 'shadcn-nuxt'],
  css: ['./app/assets/css/tailwind.css'],
  alias: {
    '@': '.',
    '~/app': './app'
  },
  components: {
    dirs: [
      {
        path: './app/components',
        pathPrefix: false,
        global: true,
        extensions: ['vue']
      },
      {
        path: './app/components/ui',
        pathPrefix: false,
        global: true,
        extensions: ['vue']
      }
    ]
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  }
})
