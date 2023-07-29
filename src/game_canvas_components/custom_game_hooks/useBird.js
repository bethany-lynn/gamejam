export default function useBird() {
  let birdSheet = new Image();
  birdSheet.src = "/sprites/bird_3_robin.png";

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
      this.speed = 10;
      this.scale = 2;
      this.width = 32;
      this.height = 32;
      this.scaledWidth = this.scale * this.width;
      this.scaledHeight = this.scale * this.height;
      this.spriteSheet = birdSheet;
      this.ready = false;
      this.maxHeight = 35;
      this.minHeight = 525;
      this.initBird();

      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
    }

    async initBird() {
      await birdSheetLoadedPromise;
      this.ready = true;
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

    draw(ctx, obstacleLoopIndex) {
      if (!this.ready) {
        return;
      }
      this.move();
      ctx.strokeStyle = "transparent";
      ctx.strokeRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
      ctx.fillStyle = "transparent";
      ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
      this.drawFrame(ctx, obstacleLoopIndex, 3, this.x, this.y)
      this.shoot();
    }

    // methods responding to keypress - interactive elements

    shoot() {
      if (this.shootPressed) {
        const speed = 15;
        const delay = 15;
        const projectileX = this.x + this.width / 4;
        const projectileY = this.y;
        this.projectileController.shoot(projectileX, projectileY, speed, delay);
      }
    }

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

//   function drawBird(ctx, xBird, yBird) {
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(xBird, yBird, 40, 40);
//   }

// birdWidth = 40
// birdHeight = 40

// export default class Bird {
//     constructor(x, y, bulletController) {
//       this.x = x;
//       this.y = y;
//       this.bulletController = bulletController;
//       this.width = 40;
//       this.height = 40;
//       this.speed = 4;

//       document.addEventListener("keydown", this.keydown);
//       document.addEventListener("keyup", this.keyup);
//     }

//     draw(ctx) {
//       this.move();
//       ctx.strokeStyle = "yellow";
//       ctx.strokeRect(this.x, this.y, this.width, this.height);
//       ctx.fillStyle = "black";
//       ctx.fillRect(this.x, this.y, this.width, this.height);

//       this.shoot();
//     }

//     shoot() {
//       if (this.shootPressed) {
//         const speed = 5;
//         const delay = 7;
//         const damage = 1;
//         const bulletX = this.x + this.width / 2;
//         const bulletY = this.y;
//         this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
//       }
//     }

//     move() {
//       if (this.downPressed) {
//         this.y += this.speed;
//       }
//       if (this.upPressed) {
//         this.y -= this.speed;
//       }
//     }

//     keydown = (e) => {
//       if (e.code === "ArrowUp") {
//         this.upPressed = true;
//       }
//       if (e.code === "ArrowDown") {
//         this.downPressed = true;
//       }
//       if (e.code === "Space") {
//         this.shootPressed = true;
//       }
//     };

//     keyup = (e) => {
//       if (e.code === "ArrowUp") {
//         this.upPressed = false;
//       }
//       if (e.code === "ArrowDown") {
//         this.downPressed = false;
//       }
//       if (e.code === "Space") {
//         this.shootPressed = false;
//       }
//     };
//   }
