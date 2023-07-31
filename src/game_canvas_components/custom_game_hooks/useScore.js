export default function useScore() {

    class Score {
        constructor() {
            this.x = 1050;
            this.y = 50;
            this.width = 60
            this.height = 80
            this.score = 0;
        }

        // method to add point to score, called every time a target
        // is hit by a projectile
        updateScore() {
            this.score ++
        }

        // this handles score and transparent background - background
        // adjusts size at double digits
        draw(ctx) {
            if (this.score > 9 && this.width === 60) {
                this.width += 55;
            }
            ctx.fillStyle = "rgba(225,225,225,0.8)";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "pink";
            ctx.font = "90px Arial";
            ctx.fillText(`${this.score}`, this.x+5, this.y+72)
            ctx.strokeStyle = "black";
            ctx.strokeText(`${this.score}`, this.x+5, this.y+72)
        }
    }
    return { Score }
}