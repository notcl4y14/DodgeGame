import Box from "../../core/box.js";

export default class HurtBox extends Box {

	constructor (x, y, width, height) {
		super();
		this.setPosition(x, y);
		this.setSize(width, height);
		this.setVelocity(0, 0);
		this.color = "#ff0000";
	}

	update () {
		this.applyVelocity();
		this.bounceOffWorld();
	}
	
}