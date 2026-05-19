import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'src', '')
  const apiKey = env.API_KEY

  const hackClubProxy = {
    '/api': {
      target: 'https://ai.hackclub.com/proxy/v1',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          if (apiKey) {
            proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
          }
        })
      },
    },
  }

  return {
    envDir: 'src',
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    server: {
      proxy: hackClubProxy,
    },
    preview: {
      proxy: hackClubProxy,
    },
  }
})
