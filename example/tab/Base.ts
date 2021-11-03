import { TYPE } from './Tab';

export default abstract class Base {

  private _currentIndex: number = 0;
  private _el: HTMLElement;
  private _tabItems: HTMLCollection;
  private _methodArray: any[] = [];
  private _pageElement: HTMLElement | HTMLCollection;

  constructor(el: HTMLElement, type: TYPE) {
    this._el = el;
    this._tabItems = this._el.getElementsByClassName('tab-item');

    switch (type){
      case TYPE.FADE:
        this._pageElement = this._el.getElementsByClassName('page-item');
        break;
      case TYPE.SLIDE:
        this._pageElement = this._el.querySelector('.inner') as HTMLElement;
        break;
      default:
        break;
    }

    this.init();
  }

  private init() {
    this.bindEvent();
  }

  private bindEvent() {
    this._el.addEventListener('click', this.setTab.bind(this), false);
  }

  private setTab(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const className = target.className;

    if (className === 'tab-item') {
      this._tabItems[this._currentIndex].className = 'tab-item';
      this._currentIndex = [].indexOf.call(this._tabItems, target);
      this._tabItems[this._currentIndex].className += ' active';

      this.notify();
    }
  }

  protected getMethods(method: any) {
    this._methodArray.push(method);
  }

  private notify (){
    this._methodArray.forEach((method: any) => {
      method(this._pageElement, this._currentIndex);
    })
  }
}