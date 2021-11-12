const examples = [
  {
    title: '轮播图',
    tip: 'Proxy API',
    url: '/example/carousel/',
  },
  {
    title: '省市区联动',
    tip: 'Class',
    url: '/example/multi-level-linkage/',
  },
  {
    title: 'MVVM',
    tip: '数据双向绑定',
    url: '/example/MVVM/',
  },
  {
    title: 'JSONP',
    tip: '跨域问题',
    url: '/example/JSONP/',
  },
  {
    title: 'debounce-throttle',
    tip: '防抖与节流',
    url: '/example/debounce-throttle/',
  },
  {
    title: 'file',
    tip: '文件操作',
    url: '/example/file/',
  },
  {
    title: 'tab',
    tip: 'TS/观察者模式',
    url: '/example/tab/',
  },
  {
    title: 'rewrite',
    tip: '原生方法重写',
    url: '/rewrite/',
  },
  {
    title: 'tree-data',
    tip: '树形数据结构化',
    url: '/example/tree-data/',
  },
  {
    title: 'vue-mini',
    tip: 'data,computed,watch原理',
    url: '/vue-mini/',
  },
];

const frag = document.createDocumentFragment();

examples.forEach(item => {
  const a = document.createElement('a');
  a.textContent = `${item.title}(${item.tip})`;
  a.href = item.url;
  frag.append(a);
  frag.append(document.createElement('hr'));
})

document.querySelector('#app').append(frag);