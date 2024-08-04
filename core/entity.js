import Display from "../front/display.js";

export default class Entity {

	position;
	size;
	velocity;
	overlaps = [];

	constructor () {
		this.position = [0, 0];
		this.size = [0, 0];
		this.velocity = [0, 0];
	}

	// Setters
	setPosition (x, y) {
		this.position = [x, y];
	}

	setSize (width, height) {
		this.size = [width, height];
	}

	setVelocity(x, y) {
		this.velocity = [x, y];
	}

	// Velocity
	applyVelocity() {
		this.position[0] += this.velocity[0];
		this.position[1] += this.velocity[1];
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

	separateFrom (other) {
		const centerX = other.x + other.width / 2;
		const centerY = other.y + other.height / 2;

		const dx = this.x - centerX;
		const dy = this.y - centerY;

		// https://stackoverflow.com/a/22440044/22146374
		const x1 = Math.max(this.x, other.x);
		const y1 = Math.max(this.y, other.y);
		const x2 = Math.min(this.x + this.width, other.x + other.width);
		const y2 = Math.min(this.y + this.height, other.y + other.height);

		const width = x2 - x1;
		const height = y2 - y1;

		const vx = width * Math.sign(dx);
		const vy = height * Math.sign(dy);

		if (width < height) {
			this.x += vx;
			return 0;
		} else {
			this.y += vy;
			return 1;
		}
	}

	// Misc. Functions
	destroy () {
		world.remove(this);
	}

	bounceOffX () {
		this.velocity[0] *= -1;
	}

	bounceOffY () {
		this.velocity[1] *= -1;
	}

	bounceOffWorld () {
		if (this.x < 0) {
			this.x = 0;
			this.bounceOffX();
		} else if (this.x > world.width - this.width) {
			this.x = world.width - this.width;
			this.bounceOffX();
		}

		if (this.y < 0) {
			this.y = 0;
			this.bounceOffY();
		} else if (this.y > world.height - this.height) {
			this.y = world.height - this.height;
			this.bounceOffY();
		}
	}

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