import { useRef, useEffect, useState } from "react";
import useBird from "./custom_game_hooks/useBird";
import useProjectileController from "./custom_game_hooks/useProjectileController";
import useTargetController from "./custom_game_hooks/useTargetController";

export default function GameCanvas(props) {
  // const { gameActive, setGameActive } = useState(true);
  const canvasRef = useRef();

  let { Bird } = useBird();
  let { ProjectileController } = useProjectileController();
  let { TargetController } = useTargetController();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const targetController = new TargetController(canvas);
    const projectileController = new ProjectileController(canvas);
    const bird = new Bird(
      canvas.width / 6,
      canvas.height / 2.1,
      projectileController
    );

    function game() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      projectileController.draw(context);
      bird.draw(context);

      targetController.draw(context, canvas.width, (8 * canvas.height) / 9);

      targetController.targets.forEach((target) => {
        if (projectileController.collideWith(target)) {
          console.log("collision logged");
        }
      });

      requestAnimationFrame(game);
    }

    requestAnimationFrame(game);
  }, [Bird, ProjectileController, TargetController]);

  return (
    <>
      <canvas
        className="birdCanvas"
        width="1200"
        height="675"
        ref={canvasRef}
        {...props}
      >
        Bird Party Game!
      </canvas>
    </>
  );
}
