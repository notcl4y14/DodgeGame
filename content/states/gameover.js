import State from "../../core/state.js";
import Display from "../../front/display.js";
import Keyboard from "../../front/keyboard.js";

export default class GameOver extends State {

	static name = "GameOver";

	static update () {
		if (Keyboard.isKeyDown("KeyR")) {
			initLevel();
		}

		world.update();
	}

	static draw () {
		// Center the World box
		Display.context.save();
		Display.context.translate(
			Display.canvas.width / 2 - world.width / 2,
			Display.canvas.height / 2 - world.height / 2
		);

		world.draw();

		Display.context.restore();

		Display.context.save();
		Display.context.translate(
			Display.canvas.width / 2,
			Display.canvas.height / 2
		);

		Display.context.fillStyle = "#000000";
		Display.context.fillRect(-100, -20, 100 * 2, 20 * 2);

		Display.context.textBaseline = "middle";
		Display.context.textAlign = "center";
		Display.context.fillStyle = "#ffffff";

		Display.context.font = "16px sans-serif";
		Display.context.fillText("Game Over", 0, 0);

		Display.context.font = "10px sans-serif";
		Display.context.fillText("Press R to restart", 0, 10);

		Display.context.restore();
	}
	
}