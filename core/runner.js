export default class Runner {

	ticks;
	update;
	draw;

	constructor () {
		this.ticks = 0;
	}

	// Run
	async run () {
		this.loop();
	}

	// Loop
	loop () {
		this.ticks += 1;

		this.update();
		this.draw();

		requestAnimationFrame( () => this.loop.call(this) );
	}

}