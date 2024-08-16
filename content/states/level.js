import State from "../../core/state.js";
import Display from "../../front/display.js";

export default class Level extends State {

	static name = "Level";

	static update() {
		world.checkColFor(player);
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