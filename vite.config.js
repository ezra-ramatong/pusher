import { resolve } from "path";
const isDev = process.env.NODE_ENV !== "production";
/** @type {import('vite').UserConfig} */
export default {
  // ...
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: isDev
        ? undefined // Let Vite use index.html in dev
        : {
            content: resolve(__dirname, "src/content.js"), // build entry
          },
      output: {
        entryFileNames: "[name].js", // Will produce content.js
        chunkFileNames: "[name].js", // No hash
        assetFileNames: "[name][extname]", // style.css etc.
      },
    },
  },
};
