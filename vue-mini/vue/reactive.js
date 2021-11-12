export function reactive(vm, __get__, __set__) {
  const _data = vm.$data

  for (let k in _data) {
    Object.defineProperty(vm, k, {
      get() {
        __get__(k, _data[k])
        return _data[k]
      },
      set(newVal) {
        const oldVal = _data[k]
        _data[k] = newVal
        __set__(k, newVal, oldVal)
      }
    })
  }
}