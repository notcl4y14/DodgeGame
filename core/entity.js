import Display from "../front/display.js";

export default class Entity {

	position;
	size;
	overlaps = [];

	// Setters
	setPosition (x, y) {
		this.position = [x, y];
	}

	setSize (width, height) {
		this.size = [width, height];
	}

	// Position Functions
	move (x, y) {
		this.position[0] += x;
		this.position[1] += y;
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

	set x(v) {
		this.position[0] = v;
	}
	set y(v) {
		this.position[1] = v;
	}
	set width(v) {
		this.size[0] = v;
	}
	set height(v) {
		this.size[1] = v;
	}

	// Collision
	removeOverlap (object) {
		this.overlaps.splice( this.overlaps.indexOf(object), 1 );
	}

	onOverlap (other) {
		return;
	}

	// Misc. Functions
	isOutOfBounds (world) {
		return this.x < 0 || this.x > world.width - this.width ||
		       this.y < 0 || this.y > world.height - this.height;
	}

	getSidePos (side) {
		switch (side) {
			case "left":
				return this.x;
			case "right":
				return this.x + this.width;
			case "top":
				return this.y;
			case "bottom":
				return this.y + this.height;
			default:
				return null;
		}
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