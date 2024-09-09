import Display from "../front/display.js";

export default class SelectBox {

	static prefix = "> ";
	static optionsPadding = 10;
	static textInterval = 14;
	static font = "15px monospace";

	options = [];
	index = 0;

	constructor (options) {
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

	draw (x, y, width, height) {
		Display.context.fillStyle = "#000000";
		Display.context.fillRect(x, y, width, height);

		this.drawOptions(x, y);
	}

	drawOptions (x, y) {
		x = SelectBox.optionsPadding + x;
		y = SelectBox.optionsPadding + y;

		// console.log(y);
		// debugger;

		Display.context.save();
		Display.context.textBaseline = "top";
		Display.context.font = SelectBox.font;

		Display.context.fillStyle = "#ffffff";

		for (let i = 0; i < this.options.length; i++) {
			let option = this.options[i];

			if (i == this.index) {
				option = SelectBox.prefix + option;
			}

			Display.context.fillText(option, x, y + i * SelectBox.textInterval);
		}

		Display.context.restore();
	}

}