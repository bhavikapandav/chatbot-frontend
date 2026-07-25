import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@images": path.resolve("src/assets/images"),
        "@utils": path.resolve("src/utils"),
        "@const": path.resolve("src/const"),
        "@pages": path.resolve("src/pages"),
        "@components": path.resolve("src/components"),
        "@validations": path.resolve("src/validations"),
        "@services": path.resolve("src/services"),
        "@actions": path.resolve("src/actions"),
        "@helpers": path.resolve("src/helpers"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_TARGET || "http://10.47.46.126:5001",
          changeOrigin: true,
        },
      },
    },
  };
})



