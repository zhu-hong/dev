import Base from './Base';
import { TYPE } from './Tab';

export default class Fade extends Base {
  constructor(el: HTMLElement) {
    super(el, TYPE.SLIDE);

    this.getMethods(this.setPage);
  }

  private setPage(el: HTMLElement, currentIndex: number) {
    el.style.transform = `translateX(-${currentIndex * 500}px)`;
  }
}