import Food from '../Food'
import ScorePanel from '../ScorePanel'
import Snake from '../Snake'

export default class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  direction: string = 'ArrowUp'
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent) {
    console.log(event.key);
    this.direction = event.key;
  }

  run() {
    let [X, Y] = this.snake.pos;

    switch (this.direction) {
      case "ArrowUp":
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
      default:
        break;
    }

    this.check(X, Y);
    let timer;
    try {
      this.snake.pos = [X, Y];
    } catch (e: any) {
      console.log(e.message);
      alert(e.message + "GameOver");
      this.isLive = false;
    }
    clearTimeout(timer);

    this.isLive && (timer = setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30));
  }

  check(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      console.log('🐍吃到食物了');
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }
}