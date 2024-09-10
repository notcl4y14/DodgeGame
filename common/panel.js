import Display from "../front/display.js";

export default class Panel {

	static innerPadding = 10;
	static textInterval = 14;
	static font = "15px monospace";

	static bgColor = "#000000";
	static textColor = "#ffffff";
	
	x = 0;
	y = 0;
	text = "";

	draw () {
		Display.context.fillStyle = Panel.bgColor;
		Display.context.fillRect(this.x, this.y, this.width, this.height);

		this.drawText();
	}

	drawText () {
		const x = Panel.optionsPadding + this.x;
		const y = Panel.optionsPadding + this.y;

		const maxWidth = this.width - Panel.optionsPadding * 2;

		Display.context.save();
		Display.context.textBaseline = "top";
		Display.context.font = Panel.font;

		Display.context.fillStyle = Panel.textColor;
		Display.context.fillText(this.text, x, y, maxWidth);

		Display.context.restore();
	}

}