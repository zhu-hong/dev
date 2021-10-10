const cases = [];

const frag = document.createDocumentFragment();

cases.forEach(item => {
  const a = document.createElement('a');
  a.textContent = `${item.title}(${item.tip})`;
  a.href = item.url;
  frag.append(a);
})

document.body.append(frag);