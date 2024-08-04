import Particle from "../entities/particle.js";

export default class Shard extends Particle {

	constructor (x = 0, y = 0, width = 0, height = 0) {
		super();
		this.setPosition(x, y);
		this.setSize(width, height);
	}

	update () {
		this.applyVelocity();
		this.updateAlpha();
		this.bounceOffWorld();
	}

}