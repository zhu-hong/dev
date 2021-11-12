class Watcher {
  constructor() {
    this.watchers = []
  }

  addWatcher(vm, watcher, key) {
    this._addWatchProp({
      key,
      fn: watcher[key].bind(vm)
    })
  }

  invoke(key, newVal, oldVal) {
    this.watchers.map((item) => {
      if(item.key === key) {
        item.fn(newVal, oldVal)
      }
    })
  }

  _addWatchProp(watchProp) {
    this.watchers.push(watchProp)
  }
}

export default Watcher