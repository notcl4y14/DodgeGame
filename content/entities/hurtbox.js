import Box from "../../core/box.js";
import Display from "../../front/display.js";

export default class HurtBox extends Box {

	velocity;

	constructor (x, y, width, height) {
		super();
		this.setPosition(x, y);
		this.setSize(width, height);
		this.setVelocity(0, 0);
		this.color = "#ff0000";
	}

	setVelocity (x, y) {
		this.velocity = [x, y];
	}

	applyVelocity () {
		this.position[0] += this.velocity[0];
		this.position[1] += this.velocity[1];
	}

	update () {
		this.applyVelocity();

		if (this.x < 0) {
			this.position[0] = 0;
			this.velocity[0] *= -1;
		} else if (this.x > world.width - this.width) {
			this.position[0] = world.width - this.width;
			this.velocity[0] *= -1;
		}

		if (this.y < 0) {
			this.position[1] = 0;
			this.velocity[1] *= -1;
		} else if (this.y > world.height - this.height) {
			this.position[1] = world.height - this.height;
			this.velocity[1] *= -1;
		}
	}
	
}