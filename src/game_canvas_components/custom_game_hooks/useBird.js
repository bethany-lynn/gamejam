export default function useBird() {
  class Bird {
    constructor(x, y, projectileController) {
      this.x = x;
      this.y = y;
      this.projectileController = projectileController;
      //   this.upPressed = upPressed
      //   this.downPressed = downPressed
      //   this.shootPressed = shootPressed
      this.width = 40;
      this.height = 40;
      this.speed = 10;

      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
    }

    draw(ctx) {
      this.move();
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);

      this.shoot();
    }

// methods responding to keypress - interactive elements

    shoot() {
      if (this.shootPressed) {
        const speed = 15;
        const delay = 10;
        const projectileX = this.x + this.width / 4;
        const projectileY = this.y;
        this.projectileController.shoot(
          projectileX,
          projectileY,
          speed,
          delay
        );
      }
    }

    move() {
      if (this.downPressed) {
        this.y += this.speed;
      }
      if (this.upPressed) {
        this.y -= this.speed;
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
