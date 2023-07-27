import useObstacle from "./useObstacle";

export default function useObstacleController(props) {
  const { Obstacle, init } = useObstacle();

  class ObstacleController {
    constructor(canvas) {
      this.canvas = canvas;
      this.offset = 140;
      this.hasCollisionOccurred = false;
      this.obstacles = [];
      this.timerTillNextObstacle = 0;
      this.initObstacle();
      this.ready = false;
    }

    async initObstacle() {
      const obstacle = new Obstacle(0, 200, 15); // Set initial x, y, and speed as needed
      await obstacle.init(); // Wait for the obstacle to be ready (image loaded)
      this.obstacles.push(obstacle);
      this.ready = true;
    }

    //method for generating targets with some randomness in delay between spawns

    spawn(x, y, score) {
      if (this.ready) {
        if (!this.hasCollisionOccurred) {
          let speed = 10 + (score / 5);
          let delay = Math.random() * 120;

          if (this.timerTillNextObstacle <= 0) {
            let newSpawn = new Obstacle(x, y, speed);
            newSpawn.init();
            this.obstacles.push(newSpawn);
            this.timerTillNextObstacle = delay;
          }

          this.timerTillNextObstacle--;
        }
      }
    }

    draw(ctx, x, y, score) {
      const row = this.randomRow();
      this.spawn(x, (row * y) / 5 - this.offset, score);

      if (!this.hasCollisionOccurred) {
        const collisionDetected = this.collideWith({ x: x, y: y });

        if (collisionDetected) {
          this.hasCollisionOccurred = true;
          props.setCollisionWithObstacle(true);
        }
      }

      this.obstacles.forEach((obstacle) => {
        if (this.isTargetOffScreen(obstacle)) {
          const index = this.obstacles.indexOf(obstacle);
          this.obstacles.splice(index, 1);
        }
        if (this.collideWith) obstacle.draw(ctx);
      });
    }

    randomRow() {
      let numRow = 6;
      return Math.floor(Math.random() * numRow) + 1;
    }

    collideWith(sprite) {
      if (!this.hasCollisionOccurred) {
        const collisionDetected = this.obstacles.some((obstacle) => {
          if (obstacle.collideWith(sprite)) {
            return true;
          }
          return false;
        });

        if (collisionDetected) {
          this.hasCollisionOccurred = true;
          props.setCollisionWithObstacle(true);
          return true;
        }
      }

      return false;
    }

    isTargetOffScreen(obstacle) {
      return obstacle.x <= -obstacle.width;
    }
  }

  return { ObstacleController };
}
