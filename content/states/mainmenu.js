import HurtBox from "../entities/hurtbox.js";
import State from "../../core/state.js";
import World from "../../core/world.js";
import Display from "../../front/display.js";
import Keyboard from "../../front/keyboard.js";
import drawPrompt from "../../util/graphics.js";
import SelectBox from "../../common/selectbox.js";

export default class MainMenu extends State {

	static name = "MainMenu";

	static selectBox = new SelectBox(10, 10, 200, 50, [ "Play", "Settings" ]);

	static init() {
		world = new World(1024, 512);

		const hurtbox1 = new HurtBox(0, 0, 20, 20);
		hurtbox1.setVelocity(2, 2);
		const hurtbox2 = new HurtBox(world.width - 20, 0, 20, 20);
		hurtbox2.setVelocity(-2, 2);
		const hurtbox3 = new HurtBox(0, world.height - 20, 20, 20);
		hurtbox3.setVelocity(2, 2);
		const hurtbox4 = new HurtBox(world.width - 20, world.height - 20, 20, 20);
		hurtbox4.setVelocity(-2, 2);

		world.add(hurtbox1);
		world.add(hurtbox2);
		world.add(hurtbox3);
		world.add(hurtbox4);
	}

	static update() {
		// if (Keyboard.isKeyDown("Space"))
		// {
		// 	initLevel();
		// }

		if (Keyboard.isKeyPressed("ArrowUp")) {
			this.selectBox.move(-1);
		} else if (Keyboard.isKeyPressed("ArrowDown")) {
			this.selectBox.move(1);
		} else if (Keyboard.isKeyPressed("Space")) {
			if (this.selectBox.index == 0) {
				initLevel();
			}
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

		this.selectBox.draw();

		// drawPrompt("Press Spacebar to Start");
	}

}