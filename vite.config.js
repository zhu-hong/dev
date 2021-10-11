import { resolve } from 'path'

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        carousel: resolve(__dirname, 'carousel/index.html'),
        multiLevelLinkage: resolve(__dirname, 'multi-level-linkage/index.html'),
        MVVM: resolve(__dirname, 'MVVM/index.html'),
      }
    }
  },
  server: {
    open: true,
  },
}