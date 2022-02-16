// Food类
export default class Food {
  ele: HTMLElement;
  constructor() {
    this.ele = document.getElementById('food')!;
  }
  get X() {
    return this.ele.offsetLeft;
  }
  get Y() {
    return this.ele.offsetTop;
  }
  change() {
    let top = Math.floor(Math.random() * 30) * 10;
    let left = Math.floor(Math.random() * 30) * 10;
    this.ele.style.left = left + 'px';
    this.ele.style.top = top + 'px';
  }
}
