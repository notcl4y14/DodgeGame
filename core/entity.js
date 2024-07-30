export default class Entity {

	position;
	size;

	// Setters
	setPosition (x, y) {
		this.position = [x, y];
	}

	setSize (width, height) {
		this.size = [width, height];
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

	// Update/Draw
	update () {
		return;
	}

	draw () {
		return;
	}

}