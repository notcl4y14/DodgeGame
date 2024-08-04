import Controls from "../controls.js";
import Box from "../../core/box.js";
import CustomEvent from "../../front/event.js";
import Display from "../../front/display.js";

export default class Player extends Box {

	dashSpeed;

	constructor (x, y, width, height, defaultSpeed) {
		super();
		this.setPosition(x, y);
		this.setSize(width, height);

		this.defaultSpeed = defaultSpeed;
		this.speed = this.defaultSpeed;

		this.dashSpeed = 0;
		this.dashSpeedMax = 250;

		this.addEvents();
	}

	// Events
	addEvents() {
		CustomEvent.addListener("keyup", this.onKeyUp, this);
	}
	
	onKeyUp(event) {
		if (event.code == Controls.getBind("Dash")) {
			this.dash();
		}
	}

	// Collision
	onOverlap (other) {
		// console.log("Overlaps!");
		this.setPosition(10, 10);
	}

	// Update/Draw
	update () {
		const left = Controls.isDown("MoveLeft");
		const right = Controls.isDown("MoveRight");
		const up = Controls.isDown("MoveUp");
		const down = Controls.isDown("MoveDown");
		const dash = Controls.isDown("Dash");
		const walk = Controls.isDown("Walk");

		let dirX = right - left;
		let dirY = down - up;

		if (dash) {
			dirX /= 8;
			dirY /= 8;

			this.dashSpeed += this.dashSpeed < this.dashSpeedMax
				? 10
				: this.dashSpeedMax - this.dashSpeed;
		} else if (walk) {
			dirX /= 2;
			dirY /= 2;
		}

		this.position[0] += dirX * this.speed;
		this.position[1] += dirY * this.speed;
	}

	draw () {
		Display.context.fillStyle = this.color;
		Display.context.fillRect(this.x, this.y, this.width, this.height);

		this.drawDash();
		// this.drawInfo();
	}

	// Draw Functions

	drawDash () {
		if (this.dashSpeed == 0) {
			return;
		}

		const left = Controls.isDown("MoveLeft");
		const right = Controls.isDown("MoveRight");
		const up = Controls.isDown("MoveUp");
		const down = Controls.isDown("MoveDown");

		// const initDirX = right - left;
		// const initDirY = down - up;

		// const dirX = initDirX;
		// const dirY = initDirY;

		let dirX = right - left;
		let dirY = down - up;

		// https://forum.freecodecamp.org/t/how-do-i-get-another-circle-to-move-diagonally-across-my-page/306359/3
		if (dirX != 0 && dirY != 0) {
			const initDirX = dirX;
			const initDirY = dirY;
			dirX /= Math.sqrt(Math.pow(initDirX, 2) + Math.pow(initDirY, 2));
			dirY /= Math.sqrt(Math.pow(initDirX, 2) + Math.pow(initDirY, 2));
		}

		let x = this.x + dirX * this.dashSpeed;
		let y = this.y + dirY * this.dashSpeed;

		if (x < 0) {
			x = 0;
		} else if (x > world.width - this.width) {
			x = world.width - this.width;
		}

		if (y < 0) {
			y = 0;
		} else if (y > world.height - this.height) {
			y = world.height - this.height;
		}

		Display.context.fillStyle = this.color;
		Display.context.fillRect(x, y, this.width, this.height);

		Display.context.strokeStyle = this.color;
		Display.context.beginPath();
		Display.context.arc(this.x + this.width / 2, this.y + this.height / 2, this.dashSpeed, 0, 2 * Math.PI);
		Display.context.closePath();
		Display.context.stroke();

		Display.context.beginPath();
		Display.context.moveTo(this.x + this.width / 2, this.y + this.height / 2);
		Display.context.lineTo(x + this.width / 2, y + this.height / 2);
		Display.context.closePath();
		Display.context.stroke();
	}

	// Misc.
	dash () {
		const left = Controls.isDown("MoveLeft");
		const right = Controls.isDown("MoveRight");
		const up = Controls.isDown("MoveUp");
		const down = Controls.isDown("MoveDown");

		let dirX = right - left;
		let dirY = down - up;

		if (dirX != 0 && dirY != 0) {
			const initDirX = dirX;
			const initDirY = dirY;
			dirX /= Math.sqrt(Math.pow(initDirX, 2) + Math.pow(initDirY, 2));
			dirY /= Math.sqrt(Math.pow(initDirX, 2) + Math.pow(initDirY, 2));
		}
		
		this.position[0] += dirX * this.dashSpeed;
		this.position[1] += dirY * this.dashSpeed;

		this.dashSpeed = 0;
	}

}