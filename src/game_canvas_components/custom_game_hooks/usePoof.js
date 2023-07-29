export default function usePoof(props) {

    const poofSheet = new Image();
    poofSheet.src = "/sprites/Poof.png";

    // // promise for poof image loading
    const poofSheetLoadedPromise = new Promise((resolve, reject) => {
        poofSheet.onload = () => {
            resolve();
        };
        poofSheet.onerror = (error) => {
            reject(error);
            console.log("error loading poof animation:", error);
        };
    });

    class Poof {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.scale = .35;
            this.width = 260;
            this.height = 256;
            this.scaledWidth = this.scale * this.width;
            this.scaledHeight = this.scale * this.height;
            this.spriteSheet = poofSheet;
            this.ready = false;
            this.frameX = 0;
            this.frameY = 0;
            this.frameCount = 0;
            this.init()
        }

        drawFrame(ctx, frameX, frameY, canvasX, canvasY) {
            if (this.ready) {
                ctx.drawImage(
                    this.spriteSheet,
                    frameX * this.width,
                    frameY * this.height,
                    this.width,
                    this.height,
                    canvasX,
                    canvasY,
                    this.scaledWidth,
                    this.scaledHeight
                );
            }
        }

        async init() {
            try {
                await poofSheetLoadedPromise;
                this.ready = true;
            } catch (error) {
                console.error("Error loading poof animation:", error);
            }
        }

        draw(ctx, poofLoopIndex) {
            if (!this.ready) {
                return;
            }
            // ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            // ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledWidth);
            this.drawFrame(ctx, this.frameX, this.frameY, this.x, this.y);
            if (poofLoopIndex % 2 === 0) {
                this.frameX += 1;
                if (this.frameX > 5) {
                    this.frameX = 0;
                    this.frameY += 1;
                }
                this.frameCount += 1;
            }
            console.log("animation poof drawn")
        }

    }

    return { Poof };
}