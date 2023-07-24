export default function useProjectile() {
    function drawProjectile(
        ctx,
        xProjectile,
        yProjectile,
        projectileWidth,
        projectileHeight
      ) {
        if (!(ctx instanceof CanvasRenderingContext2D)) {
          console.error("Invalid context");
          return;
        }
        ctx.fillStyle = "#000000";
        ctx.fillRect(xProjectile, yProjectile, projectileWidth, projectileHeight);
      }
      return {
        drawProjectile,
      };
}