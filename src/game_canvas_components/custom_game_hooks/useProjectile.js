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
      this.width = 10;
      this.height = 10;
      this.color = "white";
      // this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;


      // Custom shape for amorphous blob
      // const radius = this.width;
      // const x = this.x + radius;
      // const y = this.y + radius;
      // ctx.moveTo(x + radius, y);

      // // Bezier curves to create an amorphous blob
      // ctx.bezierCurveTo(x + radius, y - radius, x - radius / 2, y - radius, x, y - 1 * radius);
      // ctx.bezierCurveTo(x + radius / 1, y - radius, x - radius, y - radius / 2, x, y - 1 * radius);
      // ctx.bezierCurveTo(x + radius, y - radius / 1, x + radius, y + radius, x, y);
      // ctx.bezierCurveTo(x + radius, y + radius, x - radius / 1, y + radius, x, y);
      
      const radius = this.width / 2;
      ctx.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI);
      ctx.fill();
      
      this.y += this.speed;


      // ctx.fillRect(this.x, this.y, this.width, this.height);
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
