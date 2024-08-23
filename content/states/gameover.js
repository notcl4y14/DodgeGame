import State from "../../core/state.js";
import Display from "../../front/display.js";
import Keyboard from "../../front/keyboard.js";
import drawPrompt from "../../util/graphics.js";

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

		drawPrompt("Game Over", "Press R to restart");
	}
	
}