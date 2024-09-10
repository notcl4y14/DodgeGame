import HurtBox from "../entities/hurtbox.js";
import State from "../../core/state.js";
import World from "../../core/world.js";
import Display from "../../front/display.js";
import Keyboard from "../../front/keyboard.js";
import drawPrompt from "../../util/graphics.js";
import OptionsBox from "../../common/optionsbox.js";
import MainMenu from "./mainmenu.js";

export default class Settings extends State {

	static name = "Settings";

	static optionsBox = new OptionsBox(10, 10, 400, 500, [ "Back", "Player Color" ]);

	static init() {
		this.optionsBox.values[1] = "#0000ff";
	}

	static update() {
		if (Keyboard.isKeyDown("Escape")) {
			state = MainMenu;
		}

		if (Keyboard.isKeyPressed("ArrowUp")) {
			this.optionsBox.move(-1);
		} else if (Keyboard.isKeyPressed("ArrowDown")) {
			this.optionsBox.move(1);
		} else if (Keyboard.isKeyPressed("Space")) {
			if (this.optionsBox.index == 0) {
				state = MainMenu;
			} else if (this.optionsBox.index == 1) {
				const newColor = prompt("New Color");
				Keyboard.setKey("Space", false);
				this.optionsBox.values[1] = newColor;
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

		this.optionsBox.draw();
	}

}