export default function useProjectile() {
  class Projectile {
    //   colors = [
    //     "red",
    //     "blue",
    //     "red",
    //     "green",
    //     "yellow",
    //     "orange",
    //     "purple",
    //     "pink",
    //     "brown",
    //     "grey",
    //   ];

    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;

      this.width = 20;
      this.height = 20;
      this.color = "purple";
      // this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      this.y += this.speed;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collideWith(sprite) {
      if (
        this.x < sprite.x + sprite.width &&
        this.x + this.width > sprite.x &&
        this.y < sprite.y + sprite.height &&
        this.y + this.height > sprite.y
      ) {
        // sprite.takeDamage(this.damage);
        return true;
      }
      return false;
    }
  }
  return { Projectile }
}
