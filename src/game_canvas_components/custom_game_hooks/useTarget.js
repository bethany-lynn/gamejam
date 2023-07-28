export default function useTarget(props) {

  const foodSheet = new Image();
  foodSheet.src = "/sprites/foodiesBorderandBorderless.png";

  // A Promise to handle image loading
  const foodSheetLoadedPromise = new Promise((resolve, reject) => {
    foodSheet.onload = () => {
      resolve();
    };
    foodSheet.onerror = (error) => {
      reject(error);
      console.error("Error loading image:", error);
    };
  });

  class Target {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.scale = 4;
      this.width = 16;
      this.height = 16;
      this.scaledWidth = this.scale * this.width;
      this.scaledHeight = this.scale * this.height;
      this.spriteSheet = foodSheet;
      this.ready = false;
      this.spriteSets = 7;
      this.frameX = Math.floor(Math.random() * this.spriteSets);
      this.frameY = 0;
      this.init()      
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
      try {
        await foodSheetLoadedPromise; // Wait for food sprites to load
        this.ready = true; // Set the 'ready' flag to true once the image is loaded
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }

    draw(ctx, foodLoopIndex) {
      if(!this.ready) {
        // console.log("helllllppppp")
        return;
      }
      this.x -= this.speed;
      this.drawFrame(ctx, this.frameX, this.frameY + foodLoopIndex, this.x, this.y)
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
