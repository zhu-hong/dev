import './style.css';
import rwwc from './images/rwwc.webp'
import xstl from './images/xstl.webp'
import zczd from './images/zczd.webp'
import zlxt from './images/zlxt.webp'
import zxjh from './images/zxjh.webp'

const CO = [
  {
    url: rwwc,
    title: '习近平在中央党校（国家行政学院）中青年干部培训班开班式上发表重要讲话',
  },
  {
    url: xstl,
    title: '李克强对全国春季农业生产工作电视电话会议作出重要批示（资料图）',
  },
  {
    url: zczd,
    title: '2020年《政府工作报告》量化指标任务完成了！',
  },
  {
    url: zlxt,
    title: '倒计时2天！关注产业发展，关注今年政府工作报告',
  },
  {
    url: zxjh,
    title: '高海拔隧道贯通',
  },
]

class Carousel {
  constructor(data) {
    this.data = data;
    this.init();
  };

  current = {
    index: 0,
  };

  els = {};

  init() {
    const __this = this;

    this.current = new Proxy(this.current, {
      get() {
        return Reflect.get(...arguments);
      },
      set(target, key, value) {
        __this.useFocus(value, __this.els);
        return Reflect.set(...arguments);
      }
    });

    this.loadEl();
    this.bindEvent();
  };

  useFocus(index, { slideBox, slidePoints, slideTitle }) {
    slideBox.style.transform = `translateX(-${index * slideBox.offsetWidth}px)`;
    slidePoints.querySelector('.current').classList.remove('current');
    slidePoints.childNodes[index].classList.add('current');
    slideTitle.textContent = this.data[index].title;
  }

  loadEl() {
    const __this = this;

    const root = document.querySelector('body');

    const slider = document.createElement('div');
    slider.classList.add('slider');

    const slideBox = document.createElement('div');
    slideBox.classList.add('slide-box');

    const prev = document.createElement('div');
    prev.classList.add('prev');
    const next = document.createElement('div');
    next.classList.add('next');

    const slideCtx = document.createElement('div');
    slideCtx.classList.add('slide-ctx');

    const slideTitle = document.createElement('h1');
    slideTitle.classList.add('slide-title');

    const slidePoints = document.createElement('div');
    slidePoints.classList.add('slide-points');


    slider.append(slideBox);
    slider.append(prev);
    slider.append(next);
    slideCtx.append(slideTitle);
    slideCtx.append(slidePoints);
    slider.append(slideCtx);
    root.append(slider);

    this.data.forEach((item, index) => {
      const slidePoint = document.createElement('div');
      slidePoint.classList = 'slide-point';

      index === __this.current.index && (slideTitle.textContent = this.data[index].title, slidePoint.classList.add('current'));

      const img = document.createElement('img');
      img.src = item.url;

      img.addEventListener('load', () => {
        slideBox.append(img);
        slidePoints.append(slidePoint);
      })
    });

    this.els = {
      next,
      prev,
      slideBox,
      slideTitle,
      slidePoints
    };
  };

  bindEvent() {
    const { prev, next, slidePoints, slideBox } = this.els;

    prev.addEventListener('click', () => {
      this.current.index = this.current.index === 0 ? this.current.index = slidePoints.childNodes.length - 1 : --this.current.index;
    });

    next.addEventListener('click', () => {
      this.current.index = this.current.index === slidePoints.childNodes.length - 1 ? 0 : ++this.current.index;
    });

    slidePoints.addEventListener('click', (e) => {
      e.target.classList.contains('slide-point')
        &&
        (this.current.index = Array.prototype.indexOf.call(slidePoints.childNodes, e.target));
    });

    let autoplay = setInterval(() => { next.dispatchEvent(new MouseEvent('click')); }, 4000);

    slideBox.addEventListener('mouseover', () => {
      clearInterval(autoplay);
    });

    slideBox.addEventListener('mouseout', () => {
      autoplay = setInterval(() => { next.dispatchEvent(new MouseEvent('click')); }, 4000);
    });
  };
}

new Carousel(CO);