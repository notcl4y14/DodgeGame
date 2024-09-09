import Display from "../front/display.js";

export default class Runner {

	ticks;
	lastTicks;
	delta;

	update;
	draw;

	constructor () {
		this.ticks = 0;
		this.lastTicks = performance.now();
	}

	// Run
	async run () {
		this.loop();
	}

	// Loop
	loop () {
		this.ticks += 1;

		this.delta = (performance.now() - this.lastTicks);

		this.update();
		this.draw();

		this.lastTicks = performance.now();

		this.drawFPS();

		requestAnimationFrame( () => this.loop.call(this) );
		// setTimeout( () => this.loop.call(this), this.delta / 60 );
	}

	// Draw Functions
	drawFPS () {
		const fps = Math.floor(1000 / this.delta);
		Display.context.fillStyle = "#ffffff";
		Display.context.fillText(`FPS: ${fps}`, 0, 10);
	}

}