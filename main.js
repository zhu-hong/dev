const cases = [
  {
    title: '轮播图',
    tip: 'Proxy API',
    url: '/carousel/',
  },
  {
    title: '省市区联动',
    tip: 'Proxy API',
    url: '/multi-level-linkage/',
  },
];

const frag = document.createDocumentFragment();

cases.forEach(item => {
  const a = document.createElement('a');
  a.textContent = `${item.title}(${item.tip})`;
  a.href = item.url;
  frag.append(a);
  frag.append(document.createElement('hr'));
})

document.body.append(frag);