class Mvvm {
  constructor(opt) {
    this.el = document.querySelector(opt.el);
    this.__data = opt.data;
    this.data = {};
    this.domPool = {};

    this.init();
  }

  init() {
    this.initData();
    this.initDom();
  }

  initData() {
    const __this = this;
    for (let key in this.__data) {
      Object.defineProperty(this.data, key, {
        get() {
          return __this.__data[key];
        },
        set(value) {
          __this.__data[key] = value;
          
          __this.domPool[key].textContent = __this.data[key];
        }
      })
    }
  }

  initDom() {
    this.bindDom(this.el);
    this.bindInput(this.el);
  }

  bindDom(el) {
    const childNodes = el.childNodes;

    childNodes.forEach(node => {
      if (node.nodeType === 3) {
        const __value = node.textContent;

        if (__value.trim()) {

          const __isValid = /\{\{\s*(.+?)\s*\}\}/.test(__value);

          if (__isValid) {

            const key = __value.match(/\{\{\s*(.+?)\s*\}\}/)[1].trim();

            this.domPool[key] = node.parentNode;

            node.textContent = this.data[key];
          }
        }
      }

      node.childNodes && this.bindDom(node);
    })
  }

  bindInput(el) {
    const __allInputs = el.querySelectorAll('input[v-model]');

    __allInputs.forEach(input => {
      const __vModel = input.getAttribute('v-model');

      if (__vModel) {
        input.value = this.data[__vModel];
        input.addEventListener('keyup', this.handleInput.bind(this, __vModel, input));
      }
    })
  }

  handleInput(key, input) {
    this.data[key] = input.value;
  }
}

const mvvm = new Mvvm({
  el: '#app',
  data: {
    name: '',
    age: '',
  }
})