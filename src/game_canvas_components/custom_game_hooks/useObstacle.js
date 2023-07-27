export default function useObstacle() {
  // let setScore = props.setScore

  let balloonSheet = new Image();
  balloonSheet.src = "/sprites/BalloonSprites.png"

  const scale = 2;
  const width = 30;
  const height = 50;
  const scaledWidth = scale * width;
  const scaledHeight = scale * height;

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

  class Obstacle {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.scale = 4.5;
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
      await imageLoadedPromise; // Wait for the image to load before setting 'ready' to true
      this.ready = true;
    }

    draw(ctx) {
      if (!this.ready) {return}
      ctx.fillStyle = 'rgba(225,225,225,0.5)';
      this.x -= this.speed;
      ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
      this.drawFrame(ctx, 9, 1, this.x, this.y);
      // ctx.fillRect(this.x, this.y, 40, 40)
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

// function obstacleData() {
//   const obstacleScale = 2;
//   // const speed = Math.random() * 2 + 3;
//   // const interval = Math.random() * 2000 + 1000; // Random interval between 1000ms and 3000ms
//   function getRandomColor() {
//     // Array of 10 colors to choose from
//     const colors = [
//       "#D9ED92",
//       "#B5E48C",
//       "#99D98C",
//       "#76C893",
//       "#52B69A",
//       "#34A0A4",
//       "#168AAD",
//       "#1A759F",
//       "#1E6091",
//       "#184E77",
//     ];
//     // Randomly select a color from the colors array
//     return colors[Math.floor(Math.random() * colors.length)];
//   }

//   const numRows = 5; // Number of rows (changed to 3)
//   const rowHeight = canvas.height / numRows; // Height of each row
//   const shapeWidth = 50; // Width of the shape

//   let obstacleColumns = [];

//   for (let i = 0; i < numRows; i++) {
//     const interval = Math.random() * 2000 + 1000; // Random interval between 1000ms and 3000ms
//     const speed = Math.random() * 2 + 3;
//     const color = getRandomColor();
//     obstacleColumns.push({
//       x: canvas.width + i * (rowHeight * Math.random()),
//       interval,
//       speed,
//       color,
//     });
//   }
// }

// export default function useObstacle() {
//   let { obstacleData, obstacleScale } = obstacleData();

//   class Obstacle {
//     constructor(obstacleData, obstacleScale) {
//       this.obstacleData = obstacleData;
//       this.scale = obstacleScale;
//       this.interval = interval;
//       this.speed = speed;
//       this.color = color;
//     }

//     const brickOffsetTop = 30;

//     context.save();
//     context.translate(x, i * rowHeight + brickOffsetTop);
//     drawObstacle(context, obstacleColumns[i], obstacleScale);
//     context.restore();

//     draw(ctx) {
//     for (let i = 0; i < numRows; i++) {
//         const { x, speed } = obstacleColumns[i];
//         obstacleColumns[i].x -= speed;

//         if (obstacleColumns[i].x + shapeWidth < 0) {
//             obstacleColumns[i].x = canvas.width + rowHeight * Math.random();
//             obstacleColumns[i].interval = Math.random() * 2000 + 1000; // Randomize the interval again
//             obstacleColumns[i].speed = Math.random() * 2 + 3; // Randomize the speed again
//             obstacleColumns[i].color = getRandomColor();
//         }
//       let path = new Path2D(
//         "M5.23779 14.9023C3.95007 14.5651 3 13.3935 3 12C3 10.9133 3.57781 9.96153 4.44296 9.43519C4.77097 9.23564 5 8.88395 5 8.5C5 5.46243 7.46243 3 10.5 3C11.6319 3 12.684 3.34194 13.5585 3.92817C13.9304 4.17745 14.4138 4.20323 14.846 4.08641C15.0545 4.03006 15.2737 4 15.5 4C16.8807 4 18 5.11929 18 6.5C18 6.83774 18.1969 7.16713 18.5096 7.29468C19.9704 7.89045 21 9.32499 21 11C21 12.5603 20.1067 13.9119 18.8036 14.5713L18.1095 20.124C18.0469 20.6245 17.6215 21 17.1172 21H6.88278C6.37846 21 5.95306 20.6245 5.8905 20.124L5.23779 14.9023ZM7 8.5C7 9.68934 6.3092 10.6409 5.48246 11.1438C5.18886 11.3225 5 11.6401 5 12C5 12.5523 5.44772 13 6 13H17C18.1046 13 19 12.1046 19 11C19 10.1656 18.4885 9.44599 17.7544 9.14658C16.5999 8.67575 16 7.55001 16 6.5C16 6.22386 15.7761 6 15.5 6C15.4516 6 15.4078 6.00634 15.3679 6.01712C14.5571 6.23627 13.4331 6.25185 12.4449 5.58946C11.8895 5.21715 11.2231 5 10.5 5C8.567 5 7 6.567 7 8.5ZM7.26556 15L7.76556 19H9V15H7.26556ZM13 19V15H11V19H13ZM15 19H16.2344L16.7344 15H15V19Z"
//       );
//       ctx.save();
//       ctx.scale(this.scale, this.scale); // changing cupcake size
//       ctx.beginPath();
//       ctx.strokeStyle = "#000000";
//       ctx.fillStyle = this.obstacleData.color;
//       ctx.stroke(path);
//       ctx.fill(path);
//       ctx.restore(); // original state
//     }
//   }
// }

// function init() {
//   for (let i = 0; i < numRows; i++) {
//     const interval = Math.random() * 2000 + 1000; // Random interval between 1000ms and 3000ms
//     const speed = Math.random() * 2 + 3;
//     const color = getRandomColor();
//     obstacleColumns.push({
//       x: canvas.width + i * (rowHeight * Math.random()),
//       interval,
//       speed,
//       color,
//     });
//   }
// }
