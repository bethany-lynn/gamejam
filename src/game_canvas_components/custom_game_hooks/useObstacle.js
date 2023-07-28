export default function useObstacle() {

  let balloonSheet = new Image();
  balloonSheet.src = "/sprites/BalloonSprites.png";

  // A Promise to handle image loading
  const balloonSheetLoadedPromise = new Promise((resolve, reject) => {
    balloonSheet.onload = () => { // event handler - listens for load of sheet
      resolve();
    };
    balloonSheet.onerror = (error) => { // event listening for error loading sheet
      reject(error);
      console.error("Error loading image:", error);
    };
  });

  class Obstacle {
    constructor(x, y, speed) { // initializes position and speed of balloon
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.scale = 2.5; // drawn 2.5 many times more than original size
      this.width = 22.4; // 224px across / 10 columns
      this.height = 44.5; // 132px down / 3 rows
      this.scaledWidth = this.scale * this.width; // giving balloon size when drawn
      this.scaledHeight = this.scale * this.height; // giving balloon size when drawn
      this.spriteSheet = balloonSheet; // using loaded sheet
      this.ready = false; // not yet ready for drawing
      
      // code for random balloon selection from sprite sheet
      // const maxColumns = 9; // Assuming there are 10 columns in the sprite sheet
      this.spriteSets = 3; // Assuming there are 3 rows in the sprite sheet
      this.frameX = Math.floor(Math.random() * 2);
      this.frameY = Math.floor(Math.random() * this.spriteSets);
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY) { // method for drawing specific frame
      if (this.ready) { // checks if promise is good - image is loaded from sheet
        ctx.drawImage( // actual drawing happening
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
      this.ready = true; // sprite sheet is ready for use, changing previous state
    }

    draw(ctx, obstacleLoopIndex) {
      if (!this.ready) { // if not ready, immediately return from method
        return;
      }
      ctx.fillStyle = "transparent";
      this.x -= this.speed; // move from right to left of canvas by x position
      ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
      // this.drawFrame(ctx, 5 + obstacleLoopIndex, 1, this.x, this.y) // drawFrame from Obstacle instance
      this.drawFrame(ctx, this.frameX * 5 + obstacleLoopIndex, this.frameY, this.x, this.y)
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
