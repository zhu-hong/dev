import Base from './Base';
import { TYPE } from './Tab';

export default class Fade extends Base {
  constructor(el: HTMLElement){
    super(el, TYPE.FADE);
    this.getMethods(this.setPage);
  }

  private setPage(pageItems: HTMLCollection, currentIndex: number) {
    [...pageItems].forEach((page) => {
      page.className = 'page-item';
    })

    pageItems[currentIndex].className += ' active';
  }
}