export default function useObstacle() {

  let balloonSheet = new Image();
  balloonSheet.src = "/sprites/BalloonSprites.png";

  // A Promise to handle image loading
  const balloonSheetLoadedPromise = new Promise((resolve, reject) => {
    balloonSheet.onload = () => {
      resolve();
    };
    balloonSheet.onerror = (error) => {
      reject(error);
      console.error("Error loading image:", error);
    };
  });

  class Obstacle {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.scale = 3;
      this.width = 22.4; // 224px across / 10 columns
      this.height = 44.5; // 132px down / 3 rows
      this.scaledWidth = this.scale * this.width;
      this.scaledHeight = this.scale * this.height;
      this.spriteSheet = balloonSheet;
      this.ready = false;
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY) {
      if (this.ready) {
        ctx.drawImage(
          this.spriteSheet,
          frameX * this.width,
          frameY * this.height,
          this.width,
          this.height,
          canvasX,
          canvasY,
          this.scaledWidth,
          this.scaledHeight
        );
      }
    }

    async init() {
      await balloonSheetLoadedPromise; // Wait for the image to load before setting 'ready' to true
      this.ready = true;
    }

    draw(ctx, obstacleLoopIndex) {
      if (!this.ready) {
        return;
      }
      ctx.fillStyle = "rgba(225,225,225,0.5)";
      this.x -= this.speed;
      ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
      this.drawFrame(ctx, 5 + obstacleLoopIndex, 1, this.x, this.y)
    }

    collideWith(sprite) {
      if (
        this.x < sprite.x + sprite.width &&
        this.x + this.width > sprite.x &&
        this.y < sprite.y + sprite.height &&
        this.y + this.height > sprite.y
      ) {
        return true;
      }
      return false;
    }
  }

  return { Obstacle, init: () => balloonSheet };
}
