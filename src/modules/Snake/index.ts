export default class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  ele: HTMLElement

  constructor() {
    this.ele = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.ele.getElementsByTagName('div');
  }

  get pos() {
    return [this.head.offsetLeft, this.head.offsetTop]
  }
  set pos([value1, value2]: [number, number]) {
    if (this.pos[0] === value1 && this.pos[1] === value2) {
      return
    }

    if (value1 < 0 || value1 > 290 || value2 < 0 || value2 > 290) {
      throw new Error('🐍撞墙了');
    }

    if (this.bodies[1]) {
      let [left, top] = [(this.bodies[1] as HTMLElement).offsetLeft, (this.bodies[1] as HTMLElement).offsetTop]
      let [X, Y] = this.pos;
      if (left === value1 && Y === value2) {
        if (value1 > X) {
          value1 = X - 10;
        } else {
          value1 = X + 10;
        }
      }
      if (top === value2 && X === value1) {
        if (value2 > Y) {
          value2 = Y - 10;
        } else {
          value2 = Y + 10;
        }
      }
    }

    this.moveBody();
    this.head.style.left = value1 + 'px';
    this.head.style.top = value2 + 'px';
    this.cheackHeadBody();
  }

  addBody() {
    this.ele.insertAdjacentHTML('beforeend', "<div></div>")
  }

  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      (this.bodies[i] as HTMLElement).style.left = (this.bodies[i - 1] as HTMLElement).offsetLeft + 'px';
      (this.bodies[i] as HTMLElement).style.top = (this.bodies[i - 1] as HTMLElement).offsetTop + 'px';
    }
  }

  cheackHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      const bd = this.bodies[i] as HTMLElement;
      if (bd.offsetTop === this.pos[1] && bd.offsetLeft === this.pos[0]) {
        throw new Error('🐍撞到身体了')
      }
    }
  }
}