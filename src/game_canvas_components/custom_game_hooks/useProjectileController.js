import useProjectile from "./useProjectile.js";

export default function useProjectileController() {
  const { Projectile } = useProjectile();

  class ProjectileController {
    constructor(canvas) {
      this.canvas = canvas;
    }

    projectiles = [];
    timerTillNextProjectile = 0;

    shoot(x, y, speed, delay) {
      if (this.timerTillNextProjectile <= 0) {
        this.projectiles.push(new Projectile(x, y, speed));

        this.timerTillNextProjectile = delay;
      }

      this.timerTillNextProjectile--;
    }

    draw(ctx, projectileLoopIndex) {
      this.projectiles.forEach((projectile) => {
        if (this.isProjectileOffScreen(projectile)) {
          const index = this.projectiles.indexOf(projectile);
          this.projectiles.splice(index, 1);
        }
        projectile.draw(ctx, projectileLoopIndex);
      });
      // console.log("projectile controller draw logged")
    }

    collideWith(sprite) {
      return this.projectiles.some((projectile) => {
        if (projectile.collideWith(sprite)) {
          this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
          return true;
        }
        return false;
      });
    }

    isProjectileOffScreen(projectile) {
      return projectile.y <= -projectile.height;
    }
  }
  return { ProjectileController };
}
