import Display from "../front/display.js";
import Entity from "./entity.js";

export default class Box extends Entity {

	color;
	speed;
	defaultSpeed;

	draw () {
		Display.context.fillStyle = this.color;
		Display.context.fillRect(this.x, this.y, this.width, this.height);
	}

}