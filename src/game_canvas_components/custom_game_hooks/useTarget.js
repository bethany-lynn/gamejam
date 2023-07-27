export default function useTarget(props) {

  let balloonSheet = new Image();
  balloonSheet.src = "/sprites/BalloonSprites.png";

  // A Promise to handle image loading
  const imageLoadedPromise = new Promise((resolve, reject) => {
    balloonSheet.onload = () => {
      resolve();
    };
    balloonSheet.onerror = (error) => {
      reject(error);
      console.error("Error loading image:", error);
    };
  });

  class Target {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.scale = 2;
      this.width = 40;
      this.height = 40;
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

    draw(ctx) {
      ctx.fillStyle = "yellow";
      this.x -= this.speed;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collideWith(projectile) {
      if (
        this.x < projectile.x + projectile.width &&
        this.x + this.width > projectile.x &&
        this.y < projectile.y + projectile.height &&
        this.y + this.height > projectile.y
      ) {
        return true;
      }
      return false;
    }
  }

  return { Target };
}
