import HurtBox from "../entities/hurtbox.js";
import State from "../../core/state.js";
import World from "../../core/world.js";
import Display from "../../front/display.js";
import Keyboard from "../../front/keyboard.js";
import drawPrompt from "../../util/graphics.js";

export default class Settings extends State {

	static name = "Settings";

	static init() {
	}

	static update() {
		if (Keyboard.isKeyDown("Escape")) {
			initLevel();
		}

		world.update();
	}

	static draw() {
		// Center the World box
		Display.context.save();
		Display.context.translate(
			Display.canvas.width / 2 - world.width / 2,
			Display.canvas.height / 2 - world.height / 2
		);

		world.draw();

		Display.context.restore();
	}

}