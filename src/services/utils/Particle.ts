export class Particle {
  private x: number;
  private y: number;

  private readonly radius: number;

  private readonly speedX: number;
  private readonly speedY: number;

  private readonly screenHeight: number;
  private readonly screenWidth: number;

  public constructor(canvasWidth: number, canvasHeight: number) {
    this.screenHeight = canvasHeight;
    this.screenWidth = canvasWidth;

    this.x = Math.random() * this.screenWidth;
    this.y = Math.random() * this.screenHeight;

    this.radius = Math.random() * 2.5 + 1.5;

    this.speedX = this.random(-1, 1);
    this.speedY = this.random(1, 2);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }

  public update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > this.screenHeight) {
      this.y = -10;
      this.x = Math.random() * this.screenWidth * 1.5;
    }
  }

  private random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
