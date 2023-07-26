 export default function useObstacle(props) {

    // let setScore = props.setScore
  
    class Obstacle {
      constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 50;
        this.height = 50;
      }
  
      draw(ctx) {
        ctx.fillStyle = "green";
        this.x -= this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
  
    return { Obstacle };
  } 









// export default function useObstacle() {
//     function drawObstacle(ctx, obstacleData, scale) {
//         let path = new Path2D('M5.23779 14.9023C3.95007 14.5651 3 13.3935 3 12C3 10.9133 3.57781 9.96153 4.44296 9.43519C4.77097 9.23564 5 8.88395 5 8.5C5 5.46243 7.46243 3 10.5 3C11.6319 3 12.684 3.34194 13.5585 3.92817C13.9304 4.17745 14.4138 4.20323 14.846 4.08641C15.0545 4.03006 15.2737 4 15.5 4C16.8807 4 18 5.11929 18 6.5C18 6.83774 18.1969 7.16713 18.5096 7.29468C19.9704 7.89045 21 9.32499 21 11C21 12.5603 20.1067 13.9119 18.8036 14.5713L18.1095 20.124C18.0469 20.6245 17.6215 21 17.1172 21H6.88278C6.37846 21 5.95306 20.6245 5.8905 20.124L5.23779 14.9023ZM7 8.5C7 9.68934 6.3092 10.6409 5.48246 11.1438C5.18886 11.3225 5 11.6401 5 12C5 12.5523 5.44772 13 6 13H17C18.1046 13 19 12.1046 19 11C19 10.1656 18.4885 9.44599 17.7544 9.14658C16.5999 8.67575 16 7.55001 16 6.5C16 6.22386 15.7761 6 15.5 6C15.4516 6 15.4078 6.00634 15.3679 6.01712C14.5571 6.23627 13.4331 6.25185 12.4449 5.58946C11.8895 5.21715 11.2231 5 10.5 5C8.567 5 7 6.567 7 8.5ZM7.26556 15L7.76556 19H9V15H7.26556ZM13 19V15H11V19H13ZM15 19H16.2344L16.7344 15H15V19Z');
//         ctx.save();
//         ctx.scale(scale, scale); // changing cupcake size
//         ctx.beginPath();
//         ctx.strokeStyle = '#000000';
//         ctx.fillStyle = obstacleData.color;
//         ctx.stroke(path);
//         ctx.fill(path);
//         ctx.restore(); // original state
//       }
//       return {
//         drawObstacle,
//       };
// }

// export default class useObstacle {
//     constructor(canvas, context, obstacleScale) {
//       this.canvas = canvas;
//       this.context = context;
//       this.obstacleScale = obstacleScale;
  
//       this.numRows = 7;
//       this.rowHeight = this.canvas.height / this.numRows;
//       this.shapeWidth = 50;
//       this.brickOffsetTop = 30;
//       this.obstacleColumns = [];
  
//       this.initializeObstacleColumns();
//     }
  
//     drawObstacle(ctx, obstacleData) {
//         let path = new Path2D('M5.23779 14.9023C3.95007 14.5651 3 13.3935 3 12C3 10.9133 3.57781 9.96153 4.44296 9.43519C4.77097 9.23564 5 8.88395 5 8.5C5 5.46243 7.46243 3 10.5 3C11.6319 3 12.684 3.34194 13.5585 3.92817C13.9304 4.17745 14.4138 4.20323 14.846 4.08641C15.0545 4.03006 15.2737 4 15.5 4C16.8807 4 18 5.11929 18 6.5C18 6.83774 18.1969 7.16713 18.5096 7.29468C19.9704 7.89045 21 9.32499 21 11C21 12.5603 20.1067 13.9119 18.8036 14.5713L18.1095 20.124C18.0469 20.6245 17.6215 21 17.1172 21H6.88278C6.37846 21 5.95306 20.6245 5.8905 20.124L5.23779 14.9023ZM7 8.5C7 9.68934 6.3092 10.6409 5.48246 11.1438C5.18886 11.3225 5 11.6401 5 12C5 12.5523 5.44772 13 6 13H17C18.1046 13 19 12.1046 19 11C19 10.1656 18.4885 9.44599 17.7544 9.14658C16.5999 8.67575 16 7.55001 16 6.5C16 6.22386 15.7761 6 15.5 6C15.4516 6 15.4078 6.00634 15.3679 6.01712C14.5571 6.23627 13.4331 6.25185 12.4449 5.58946C11.8895 5.21715 11.2231 5 10.5 5C8.567 5 7 6.567 7 8.5ZM7.26556 15L7.76556 19H9V15H7.26556ZM13 19V15H11V19H13ZM15 19H16.2344L16.7344 15H15V19Z');
//         ctx.save();
//         ctx.scale(scale, scale); // changing cupcake size
//         ctx.beginPath();
//         ctx.strokeStyle = '#000000';
//         ctx.fillStyle = obstacleData.color;
//         ctx.stroke(path);
//         ctx.fill(path);
//         ctx.restore(); // original state
//     }
  
//     getRandomColor() {
//       const colors = [
//         "#D9ED92",
//         "#B5E48C",
//         "#99D98C",
//         "#76C893",
//         "#52B69A",
//         "#34A0A4",
//         "#168AAD",
//         "#1A759F",
//         "#1E6091",
//         "#184E77",
//       ];
//       return colors[Math.floor(Math.random() * colors.length)];
//     }
  
//     initializeObstacleColumns() {
//       for (let i = 0; i < this.numRows; i++) {
//         this.obstacleColumns.push(this.createObstacleColumn());
//       }
//     }
  
//     createObstacleColumn() {
//       return {
//         x: this.canvas.width + this.rowHeight * Math.random(),
//         speed: Math.random() * 2 + 3,
//         interval: Math.random() * 2000 + 1000,
//         color: this.getRandomColor(),
//       };
//     }
  
//     updateObstacleColumns() {
//       for (let i = 0; i < this.numRows; i++) {
//         const { x, speed } = this.obstacleColumns[i];
//         this.obstacleColumns[i].x -= speed;
  
//         if (this.obstacleColumns[i].x + this.shapeWidth < 0) {
//           this.obstacleColumns[i] = this.createObstacleColumn();
//         }
//       }
//     }
  
//     drawObstacles() {
//       for (let i = 0; i < this.numRows; i++) {
//         const { x } = this.obstacleColumns[i];
//         this.context.save();
//         this.context.translate(x, i * this.rowHeight + this.brickOffsetTop);
//         this.drawObstacle(this.context, this.obstacleColumns[i]);
//         this.context.restore();
//       }
//     }
  
//     game() {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       this.updateObstacleColumns();
//       this.drawObstacles();
//       requestAnimationFrame(() => this.game());
//     }
//   }