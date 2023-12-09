// "%=環境変数名%"という文字列をindex.htmlに記述し、環境変数に置換して書き出す場合

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'

export default ({ mode }: { mode: string }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log({ env });

  const htmlPlugin = () => ({
    name: 'html-transform',
    transformIndexHtml: (html: string): string =>
    html.replace(/%=(.*?)%/g, (match, p1) => env[p1] ?? match),
  });
  
  return defineConfig({
    plugins: [
      htmlPlugin(), 
      vue(),
    ],
    server: {
      port: 5174,
      host: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
      build: {
    
    }
  });
};

// Multi Page Appにする場合、次を参照
// https://ja.vitejs.dev/guide/build.html#multi-page-app
