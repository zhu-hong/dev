import { resolve } from 'path'

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        carousel: resolve(__dirname, 'example/carousel/index.html'),
        multiLevelLinkage: resolve(__dirname, 'example/multi-level-linkage/index.html'),
        MVVM: resolve(__dirname, 'example/MVVM/index.html'),
        JSONP: resolve(__dirname, 'example/JSONP/index.html'),
        debounceThrottle: resolve(__dirname, 'example/debounce-throttle/index.html'),
      }
    }
  },
  server: {
    open: true,
  },
}