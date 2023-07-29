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

        async initPoof() {
            const poof = new Poof(-50, -50);
            await poof.init();
            this.poofs.push(poof)
            this.ready = true;
        }

        spawn(x, y) {
            if (this.ready) {
                let newPoof = new Poof(x, y);
                newPoof.init();
                this.poofs.push(newPoof);
            }
        }

        draw(ctx, poofLoopIndex) {
            this.poofs.forEach((poof) => {
                this.cleanup(poof);
                poof.draw(ctx, poofLoopIndex);
            });
        }

        cleanup(sprite) {
            if (sprite.frameCount > 29) {
                const index = this.poofs.indexOf(sprite);
                this.poofs.splice(index, 1);
            }
        }
    }

    return { PoofController }
}