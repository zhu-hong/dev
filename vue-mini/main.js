import Vue from './vue'

window.vm = new Vue({
  data() {
    return {
      a: 1,
      b: 2,
    }
  },
  computed: {
    total() {
      console.log('Computed total')
      return this.a + this.b
    },
  },
  watch: {
    total(newVal, oldVal) {
      console.log('Watch total', newVal, oldVal)
    },
    a(newVal, oldVal) {
      console.log('Watch a', newVal, oldVal)
    },
    b(newVal, oldVal) {
      console.log('Watch b', newVal, oldVal)
    },
  },
})

console.log(vm)
