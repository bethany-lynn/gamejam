export default function useBird() {
  let birdSheet = new Image();
  let birdChoice = Math.floor(Math.random() * 3);

  // picks one of 3 birds to use as the sprite

  if (birdChoice === 0) {
    birdSheet.src = "/sprites/bird_1_bluejay.png";
  } if (birdChoice === 1) {
    birdSheet.src = "/sprites/bird_2_cardinal.png";
  } if (birdChoice === 2) {
    birdSheet.src = "/sprites/bird_3_robin.png";
  }

  // A Promise to handle image loading
  const birdSheetLoadedPromise = new Promise((resolve, reject) => {
    birdSheet.onload = () => {
      resolve();
    };
    birdSheet.onerror = (error) => {
      reject(error);
      console.error("Error loading image:", error);
    };
  });

  class Bird {
    constructor(x, y, projectileController) {
      this.x = x;
      this.y = y;
      this.projectileController = projectileController;
      this.speed = 12;
      this.scale = 3;
      this.width = 32;
      this.height = 32;
      this.maxHeight = 75;
      this.minHeight = 650;
      this.scaledWidth = this.scale * this.width;
      this.scaledHeight = this.scale * this.height;
      this.spriteSheet = birdSheet;
      this.ready = false;
      this.maxHeight = 35;
      this.minHeight = 470;
      this.initBird();

      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
    }

    // makes sure the sprite sheet is loaded before trying to draw
    async initBird() {
      await birdSheetLoadedPromise;
      this.ready = true;
    }

    // short hand method for longer canvas drawImage method, allowing
    // for sprite animation
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

    draw(ctx, obstacleLoopIndex) {
      if (!this.ready) {
        return;
      }
      this.move();
      this.drawFrame(ctx, obstacleLoopIndex, 3, this.x, this.y);
      this.shoot();
    }

      // shoot method runs projectileController shoot method,
      // instantiating new projectile
    shoot() {
      if (this.shootPressed) {
        const speed = 15;
        const delay = 15;
        const projectileX = this.x + this.width / 4;
        const projectileY = this.y + 24;
        this.projectileController.shoot(projectileX, projectileY, speed, delay);
      }
    }
    
    // methods responding to keypress - interactive elements
    move() {
      if (this.downPressed) {
        if (this.y < this.minHeight) {
          this.y += this.speed;
        }
      }
      if (this.upPressed) {
        if (this.y > this.maxHeight) {
          this.y -= this.speed;
        }
      }
    }

    // methods to handle keyboard event listeners
    keydown = (e) => {
      if (e.code === "ArrowUp") {
        this.upPressed = true;
      }
      if (e.code === "ArrowDown") {
        this.downPressed = true;
      }
      if (e.code === "Space") {
        this.shootPressed = true;
      }
    };

    keyup = (e) => {
      if (e.code === "ArrowUp") {
        this.upPressed = false;
      }
      if (e.code === "ArrowDown") {
        this.downPressed = false;
      }
      if (e.code === "Space") {
        this.shootPressed = false;
      }
    };
  }
  return { Bird };
}
