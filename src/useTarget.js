export default function useTarget(props) {

  // let setScore = props.setScore

  class Target {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.width = 40;
      this.height = 40;
    }

    draw(ctx) {
      ctx.fillStyle = "yellow";
      this.x -= this.speed;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collideWith(projectile) {
      if (
        this.x < projectile.x + projectile.width &&
        this.x + this.width > projectile.x &&
        this.y < projectile.y + projectile.height &&
        this.y + this.height > projectile.y
      ) {
        return true;
      }
      return false;
    }
  }

  return { Target };
}
