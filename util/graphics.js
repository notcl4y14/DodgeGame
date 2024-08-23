import Display from "../front/display.js";

export default function drawPrompt(text, altText = "") {
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
	Display.context.fillText(text, 0, 0);

	Display.context.font = "10px sans-serif";
	Display.context.fillText(altText, 0, 10);

	Display.context.restore();
}