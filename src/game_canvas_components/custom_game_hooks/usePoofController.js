import usePoof from "./usePoof";

export default function usePoofController(props) {
    const { Poof } = usePoof();

    class PoofController {
        constructor(canvas) {
            this.canvas = canvas;
            this.poofs = [];
            this.initPoof();
            this.ready = false;
        }

        // makes sure poof sprite sheet has loaded before attempting 
        // a draw
        async initPoof() {
            const poof = new Poof(-50, -50);
            await poof.init();
            this.poofs.push(poof)
            this.ready = true;
        }

        // logic to create a new poof object, called in game canvas
        // when collision is detected between projectile and target
        spawn(x, y) {
            if (this.ready) {
                let newPoof = new Poof(x, y);
                newPoof.init();
                this.poofs.push(newPoof);
            }
        }

        // draw method calling poof draw method for each poof instantiated,
        // & calling cleanup method to remove poofs that have completed their
        // animation
        draw(ctx, poofLoopIndex) {
            this.poofs.forEach((poof) => {
                this.cleanup(poof);
                poof.draw(ctx, poofLoopIndex);
            });
        }

        // cleanup method to check if framecount of poof has exceeded frames
        // available in animation, and remove poof object from array
        cleanup(sprite) {
            if (sprite.frameCount > 29) {
                const index = this.poofs.indexOf(sprite);
                this.poofs.splice(index, 1);
            }
        }
    }

    return { PoofController }
}