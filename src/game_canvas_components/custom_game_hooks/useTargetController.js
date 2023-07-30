import useTarget from "./useTarget";

export default function useTargetController() {
  const { Target } = useTarget();

  class TargetController {
    constructor(canvas) {
      this.canvas = canvas;
      this.targets = [];
      this.timerTillNextTarget = 0;
      this.initTarget();
      this.ready = false;
    }

    async initTarget() {
      const target = new Target(1200, 600, 15); // Set initial x, y, and speed as needed
      await target.init(); // Wait for the target to be ready (image loaded)
      this.targets.push(target);
      this.ready = true;
      console.log("controller init complete");
    }

    //method for generating targets with some randomness in delay between spawns

    spawn(x, y) {
      if (this.ready) {
        let speed = 10; // Random speed between 10-30
        let delay = Math.random() * 120; // Random interval between 1000ms and 3000ms

        if (this.timerTillNextTarget <= 0) {
          this.targets.push(new Target(x, y, speed));

          this.timerTillNextTarget = delay;
        }

        this.timerTillNextTarget--;
      }
    }

    draw(ctx, x, y, foodLoopIndex) {
      this.spawn(x, y);
      if (this.ready) {
        this.targets.forEach((target) => {
          if (this.isTargetOffScreen(target)) {
            const index = this.targets.indexOf(target);
            this.targets.splice(index, 1);
          }
          target.draw(ctx, foodLoopIndex);
        });
      }
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

    isTargetOffScreen(target) {
      return target.x <= -target.width;
    }
  }

  return { TargetController };
}
