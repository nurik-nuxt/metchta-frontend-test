// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    'dayjs-nuxt',
    '@vant/nuxt',
  ],

  vite: {
    build: {
      rollupOptions: {
        // output: {
        //   chunkFileNames: !process.dev && '_nuxt/[hash].js',
        //   assetFileNames: !process.dev && '_nuxt/[hash].[extname]',
        //   entryFileNames: !process.dev && '_nuxt/[hash].js',
        // },
      },
    },
  },

  telemetry: false,

  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
  },

  css: ['@/assets/css/variables.css', '@/assets/css/index.pcss'],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  imports: {
    autoImport: true,
    dirs: [
      // scan all modules within utils directory
      '/src/shared/utils/**',
    ],
  },

  router: {
    // https://router.vuejs.org/api/interfaces/routeroptions.html
    options: {
      // @ts-expect-error Должно работать :)
      scrollToTop: true,
    },
  },

  svgo: {
    defaultImport: 'component',
    autoImportPath: false,
    global: false,
  },

  nitro: {
    compressPublicAssets: true,
    esbuild: {
      options: {
        target: 'es2020',
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BASE_URL,
    }
  },

  compatibilityDate: '2024-09-15',
});
