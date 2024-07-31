import Display from "../front/display.js";

export default class Entity {

	position;
	size;

	// Setters
	setPosition (x, y) {
		this.position = [x, y];
	}

	setSize (width, height) {
		this.size = [width, height];
	}

	// Getters/Setters
	get x () {
		return this.position[0];
	}
	get y () {
		return this.position[1];
	}
	get width () {
		return this.size[0];
	}
	get height () {
		return this.size[1];
	}

	// Update/Draw
	update () {
		return;
	}

	draw () {
		return;
	}

	// Draw Functions
	drawInfo () {
		const measure = Display.context.measureText(this.constructor.name);
		const height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
		
		Display.context.save();
		Display.context.textBaseline = "bottom";

		Display.context.fillStyle = "#000000";
		Display.context.fillRect(this.x, this.y - height, measure.width, height);
		
		Display.context.fillStyle = "#ffffff";
		Display.context.fillText(this.constructor.name, this.x, this.y);

		Display.context.restore();
	}

}