import Controls from "../controls.js";
import Box from "../../core/box.js";

export default class Player extends Box {

	constructor (x, y, width, height) {
		super();
		this.setPosition(x, y);
		this.setSize(width, height);
	}

	update () {
		const left = Controls.isDown("MoveLeft");
		const right = Controls.isDown("MoveRight");
		const up = Controls.isDown("MoveUp");
		const down = Controls.isDown("MoveDown");

		const dirX = right - left;
		const dirY = down - up;

		this.position[0] += dirX * this.speed;
		this.position[1] += dirY * this.speed;
	}

}