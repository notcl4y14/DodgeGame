import Particle from "../entities/particle.js";

export default class Shard extends Particle {

	constructor (x = 0, y = 0, width = 0, height = 0) {
		super();
		this.setPosition(x, y);
		this.setSize(width, height);
	}

	inOverlap (other) {
		if (other.constructor === Shard) {
			return;
		}

		const otherCenterX = other.x - other.width / 2;
		const otherCenterY = other.y - other.height / 2;
		const xy = this.separateFrom(other);

		if (xy == 0) {
			if (this.x < otherCenterX) {
				this.velocity[0] = -1;
			} else if (this.x > otherCenterX) {
				this.velocity[0] = 1;
			}
		} else if (xy == 1) {
			if (this.y < otherCenterY) {
				this.velocity[1] = -1;
			} else if (this.y > otherCenterY) {
				this.velocity[1] = 1;
			}
		}

		// if (this.x < otherCenterX) {
		// 	this.x = other.x - this.width;
		// 	this.velocity[0] = -1;
		// } else if (this.x > otherCenterX) {
		// 	this.x = other.x + other.width;
		// 	this.velocity[0] = 1;
		// }

		// if (this.y < otherCenterY) {
		// 	this.y = other.y - this.height;
		// 	this.velocity[1] = -1;
		// } else if (this.y > otherCenterY) {
		// 	this.y = other.y + other.height;
		// 	this.velocity[1] = 1;
		// }
	}

	update () {
		this.applyVelocity();
		this.updateAlpha();
		this.bounceOffWorld();
	}

}