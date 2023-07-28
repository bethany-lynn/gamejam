export default function useProjectile() {
  let projectileSheet = new Image();
  projectileSheet.src = "/sprites/projectileSheet.png";

  // A Promise to handle image loading
  const projectileSheetLoadedPromise = new Promise((resolve, reject) => {
    projectileSheet.onload = () => {
      console.log("sheet loaded")
      resolve();
    };
    projectileSheet.onerror = (error) => {
      reject(error);
      console.error("Error loading image:", error);
    };
  });

  class Projectile {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.scale = 1;
      this.width = 20;
      this.height = 20;
      this.scaledWidth = this.scale * this.width;
      this.scaledHeight = this.scale * this.height;
      this.spriteSheet = projectileSheet;
      this.ready = false;
      this.init();
      this.color = "purple";
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
      await projectileSheetLoadedPromise;
      this.ready = true;
    }

    draw(ctx, projectileLoopIndex) {
      if (this.ready) {
        ctx.fillStyle = "rgba(225,225,225,0.5)";
        this.y += this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.drawFrame(ctx, projectileLoopIndex, 0, this.x, this.y)
        console.log("poop frame drawn")
      }
    }

    collideWith(sprite) {
      if (
        this.x < sprite.x + sprite.width &&
        this.x + this.width > sprite.x &&
        this.y < sprite.y + sprite.height &&
        this.y + this.height > sprite.y
      ) {
        // sprite.takeDamage(this.damage);
        return true;
      }
      return false;
    }
  }
  return { Projectile };
}
