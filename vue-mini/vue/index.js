import { reactive } from './reactive'
import Computed from './computed'
import Watcher from './watcher'

class Vue {
  constructor(options) {
    const { data, computed, watch } = options

    this.$data = data()

    this.init(this, computed, watch)
  }

  init(vm, computed, watch) {
    this.initData(vm)
    const computedIns = this.ininComputed(vm, computed)
    const watcherIns = this.initWatch(vm, watch)

    this.$computed = computedIns.update.bind(computedIns)
    this.$watch = watcherIns.invoke.bind(watcherIns)
  }

  initData(vm) {
    // 响应式数据
    reactive(
      vm,
      (key, value) => {
        // console.log(key, value)
      },
      (key, newVal, oldVal) => {
        // console.log(key, newVal, oldVal)

        if(newVal === oldVal) {
          return
        }

        this.$computed(key, this.$watch)
        this.$watch(key, newVal, oldVal)
      }
    )
  }

  ininComputed(vm, computed) {
    // 枚举computed => 在实例上增加computedData
    // 返回实例 => 实例里有update => 更新computedData的value

    const computedIns = new Computed()

    for (let k in computed) {
      computedIns.addComputed(vm, computed, k)
    }

    return computedIns
  }

  initWatch(vm, watch) {
    // 枚举watcher => 增加侦听器
    // 返回实例 => 实例里有调用watch的方法 => 执行侦听器

    const watcherIns = new Watcher()

    for(let k in watch) {
      watcherIns.addWatcher(vm, watch, k)
    }

    return watcherIns
  }
}

export default Vue