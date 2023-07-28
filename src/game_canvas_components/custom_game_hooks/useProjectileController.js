import useProjectile from "./useProjectile.js";

// A controller class for the projectiles to be used on the canvas
// Methods for frequency of each draw, adding and removing from an array, and tracking collision with targets

export default function useProjectileController() {
  const { Projectile } = useProjectile();

  class ProjectileController {
    constructor(canvas) {
      this.canvas = canvas;
      this.projectiles = [];
      this.timerTillNextProjectile = 0;
    }

    // runs a timer to manage frequency of projectiles produced, then
    // adds new projectiles to array
    shoot(x, y, speed, delay) {
      if (this.timerTillNextProjectile <= 0) {
        this.projectiles.push(new Projectile(x, y, speed));

        this.timerTillNextProjectile = delay;
        //this timer accounts for the frequency of projectiles drawn
      }

      this.timerTillNextProjectile--;
    }

    // loop to run draw on each projectile in the array; removes
    // projectile if it is no longer within canvas boundaries
    draw(ctx, projectileLoopIndex) {
      this.projectiles.forEach((projectile) => {
        if (this.isProjectileOffScreen(projectile)) {
          const index = this.projectiles.indexOf(projectile);
          this.projectiles.splice(index, 1);
        }
        projectile.draw(ctx, projectileLoopIndex);
      });
    }

    // loop to check if any collisions have occurred, then to check which ones
    // and eject them from the array
    collideWith(sprite) {
      return this.projectiles.some((projectile) => {
        if (projectile.collideWith(sprite)) {
          this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
          return true;
        }
        return false;
      });
    }

    // Boolean checking position of projectile
    isProjectileOffScreen(projectile) {
      return projectile.y >= this.canvas.height + projectile.height;
    }
  }
  return { ProjectileController };
}
