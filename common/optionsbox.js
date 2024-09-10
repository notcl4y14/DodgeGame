import Display from "../front/display.js";
import Panel from "./panel.js";

export default class OptionsBox extends Panel {

	static prefix = "> ";
	static unprefix = "  ";

	options = [];
	values = [];
	index = 0;

	constructor (x, y, width, height, options) {
		super();

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.options = options;
		this.index = 0;
	}

	move (delta) {
		this.index += delta;

		if (this.index < 0) {
			this.index = this.options.length - 1;
		} else if (this.index >= this.options.length) {
			this.index = 0;
		}
	}

	draw () {
		Display.context.fillStyle = Panel.bgColor;
		Display.context.fillRect(this.x, this.y, this.width, this.height);

		this.drawOptions();
	}

	drawOptions () {
		const x = Panel.innerPadding + this.x;
		const y = Panel.innerPadding + this.y;

		Display.context.save();
		Display.context.textBaseline = "top";
		Display.context.font = Panel.font;

		Display.context.fillStyle = Panel.textColor;

		for (let i = 0; i < this.options.length; i++) {
			let option = this.options[i];

			if (i == this.index) {
				option = OptionsBox.prefix + option;
			} else {
				option = OptionsBox.unprefix + option;
			}

			Display.context.fillText(option, x, y + i * Panel.textInterval);

			if (!this.values[i]) {
				continue;
			}

			Display.context.save();
			Display.context.textAlign = "right";
			
			Display.context.fillText(this.values[i], x + this.width - (Panel.innerPadding * 2), y + i * Panel.textInterval);

			Display.context.restore();
		}

		Display.context.restore();
	}

}