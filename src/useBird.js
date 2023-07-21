export default function useBird() {

  function drawBird(
    ctx,
    xBird,
    yBird,
  ) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(xBird, yBird, 40, 40);
  }

  return { drawBird };
}

//birdWidth = 40
//birdHeight = 40
