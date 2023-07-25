import useTarget from "./useTarget";

export default function useTargetController() {
  const { Target } = useTarget();

  class TargetController {
    constructor(canvas) {
      this.canvas = canvas;
    }

    targets = [];
    timerTillNextTarget = 0;

    //method for generating targets with some randomness in delay between spawns

    spawn(x, y) {
      let speed = 15; // Random speed between 10-30
      let delay = Math.random() * 120; // Random interval between 1000ms and 3000ms
      if (this.timerTillNextTarget <= 0) {
        this.targets.push(new Target(x, y, speed));

        this.timerTillNextTarget = delay;
      }

      this.timerTillNextTarget--;
    }

    draw(ctx, x, y) {
      this.spawn(x, y);
      this.targets.forEach((target) => {
        if (this.isTargetOffScreen(target)) {
          const index = this.targets.indexOf(target);
          this.targets.splice(index, 1);
        }
        if (this.collideWith)
        target.draw(ctx);
      });
    }

    collideWith(sprite) {
      return this.targets.some((target) => {
        if (target.collideWith(sprite)) {
          this.targets.splice(this.targets.indexOf(target), 1);
          return true;
        }
        return false;
      });
    }

    // collisionDetected() {
    //   this.targets.splice(this.targst)
    // }

    isTargetOffScreen(target) {
      return target.x <= -target.width;
    }
  }

  return { TargetController };
}
