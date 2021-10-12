const app = document.querySelector('#app');

function randomColor() {
  return `#${Math.random().toString().slice(2, 2 + 6)}`;
}

function debounce(fn, time, triggerNow) {
  // 判断是否为首次执行
  let timer = null;

  function debounced() {
    let [__this, args, res] = [this, arguments, undefined];

    if (timer) {
      clearTimeout(timer);
    }

    if (triggerNow) {
      let exec = !timer;

      // 只有初次触发,timer才为null,那么exec为真,才执行函数
      if (exec) {
        res = fn.apply(__this, args);
      }

      // 结束本次防抖
      timer = setTimeout(() => {
        timer = null;
      }, time)
    } else {
      timer = setTimeout(() => {
        res = fn.apply(__this, args);
      }, time)
    }

    return res;
  }

  debounced.remove = function () {
    clearTimeout(timer);
    timer = null;
  }

  return debounced;
}

document.querySelector('#debounce').addEventListener('click', debounce(function () {
  app.style.backgroundColor = randomColor();
}, 1000, false));

function throttle(fn, delay) {
  let [timer, bigin] = [null, new Date().getTime()];

  function throttled() {
    let [__this, args, res, current] = [this, arguments, undefined, new Date().getTime()];

    if (timer) {
      clearTimeout(timer);
    }

    if (current - bigin >= delay) {
      res = fn.apply(__this, args);
      bigin = current;
    } else {
      timer = setTimeout(() => {
        res = fn.apply(__this, args);
      }, delay);
    }

    return res;
  }

  throttled.remove = function () {
    clearTimeout(timer);
    timer = null;
  }

  return throttled;
}

document.querySelector('#throttle').addEventListener('click', throttle(function () {
  app.style.backgroundColor = randomColor();
}, 1000));