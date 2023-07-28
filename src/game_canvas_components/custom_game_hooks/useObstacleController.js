import useObstacle from "./useObstacle";

export default function useObstacleController(props) {
 // import obstacle class
  const { Obstacle } = useObstacle();

  class ObstacleController {
    constructor(canvas) {
      this.canvas = canvas;
      this.offset = 100;
      this.hasCollisionOccurred = false;
      this.obstacles = [];
      this.timerTillNextObstacle = 0;
      this.initObstacle();
      this.ready = false;
    }

    // makes sure that the image file for the Obstacle class has loaded
    // before attempting a draw
    async initObstacle() {
      const obstacle = new Obstacle(0, 200, 15); // Set initial x, y, and speed as needed
      await obstacle.init(); // Wait for the obstacle to be ready (image loaded)
      this.obstacles.push(obstacle);
      this.ready = true;
    }

    //method for generating targets with some randomness in delay between spawns
    // balloons
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

    // handles drawing and spawning new obstacle in one of four 4
    // random rows, updates position every frame of each object,
    // and removes obstacles that have left the screen
    draw(ctx, x, y, score, obstacleLoopIndex) {
      const row = this.randomRow();
      this.spawn(x, (row * y) / 5 - this.offset, score);

      this.obstacles.forEach((obstacle) => {
        if (this.isTargetOffScreen(obstacle)) {
          const index = this.obstacles.indexOf(obstacle);
          this.obstacles.splice(index, 1);
        }
        obstacle.draw(ctx, obstacleLoopIndex);
      });
    }

    // random choice of one of four rows
    randomRow() {
      let numRow = 4;
      return Math.floor(Math.random() * numRow) + 1;
    }

    // collision loop - checks if any collision has occurred,
    // then runs method for each obstacle(s) collided 
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
          return true;
        }
      }
      return false;
    }

    // checks if obstacle has lef the canvas
    isTargetOffScreen(obstacle) {
      return obstacle.x <= -2*obstacle.width;
    }
  }

  return { ObstacleController };
}
