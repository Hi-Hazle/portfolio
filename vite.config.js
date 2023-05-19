import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    minify: false,
    clean: true,
  },
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gltf"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      components: fileURLToPath(new URL("./src/components", import.meta.url)),
      views: fileURLToPath(new URL("./src/views", import.meta.url)),
      styles: fileURLToPath(new URL("./src/styles", import.meta.url)),
      "@images": fileURLToPath(new URL("./src/assets/images", import.meta.url)),
      "@fonts": fileURLToPath(new URL("./src/assets/fonts", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/_variables.scss";`
        data: `
            @import "@/styles/_variables.scss";
            @import "@/styles/reset.scss";
            @import "@/styles/common.scss";
            @import "@/styles/main.scss";
            `,
      },
    },
  },
});
