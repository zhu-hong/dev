class Computed {
  constructor(){
    this.computedData = []

  }

  addComputed(vm, computed, key){
    const descriptor = Object.getOwnPropertyDescriptor(computed, key),
          descriptorFn = descriptor.value.get || descriptor.value,
          value = descriptorFn.call(vm),
          get = descriptorFn.bind(vm),
          dep = this._sollectDep(descriptorFn)

    this.addComputedProp({
      key,
      value,
      get,
      dep,
    })

    const dataItem = this.computedData.find((item) => item.key === key)

    Object.defineProperty(vm, key, {
      get(){
        return dataItem.value
      },
      set(newVal){
        dataItem.value = dataItem.get()
      }
    })
  }

  update(key, watch){
    this.computedData.map((item) => {
      const dep = item.dep
      const _key = dep.find((el) => el === key)
      if(_key) {
        const oldVal = item.value
        item.value = item.get()
        watch(item.key, item.value, oldVal)
      }
    })
  }

  addComputedProp(computedProp){
    this.computedData.push(computedProp)
  }

  _sollectDep(fn){
    const matched = fn.toString().match(/this\.(.+?)/g)
    return matched.map((item) => item.split('.')[1])
  }
}

export default Computed