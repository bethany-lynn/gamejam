import useObstacle from "./useObstacle";

export default function useObstacleController() {
    const { Obstacle } = useObstacle();

    class ObstacleController {
        constructor(canvas) {
            this.canvas = canvas;
            this.offset = 140;
        }

        obstacles = [];
        timerTillNextObstacle = 0;

        //method for generating targets with some randomness in delay between spawns

        spawn(x, y) {
            let speed = 15; // Random speed between 10-30
            let delay = Math.random() * 120; // Random interval between 1000ms and 3000ms
            if (this.timerTillNextObstacle <= 0) {
                this.obstacles.push(new Obstacle(x, y, speed));

                this.timerTillNextObstacle = delay;
            }

            this.timerTillNextObstacle--;
        }

        draw(ctx, x, y) {
            const row = this.randomRow()
            this.spawn(x, (row * y / 7) - this.offset);
            this.obstacles.forEach((obstacle) => {
                if (this.isTargetOffScreen(obstacle)) {
                    const index = this.obstacles.indexOf(obstacle);
                    this.obstacles.splice(index, 1);
                }
                if (this.collideWith)
                obstacle.draw(ctx);
            });
        }

        randomRow() {
            let numRow = 6;
            return Math.floor(Math.random() * numRow) + 1;
        }

        collideWith(sprite) {
            return this.obstacles.some((obstacle) => {
                if (obstacle.collideWith(sprite)) {
                    // this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
                    // cancelAnimationFrame(obstacle);
                    return true;
                }
                return false;
            });
        }

        // collisionDetected() {
        //   this.targets.splice(this.target)
        // }

        isTargetOffScreen(obstacle) {
            return obstacle.x <= -obstacle.width;
        }
    }

    return { ObstacleController };
}