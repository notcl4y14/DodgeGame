import Display from "../front/display.js";

export default class World {

	#objects;
	#particles;
	#objectsRemove;
	#particlesRemove;
	max;

	width;
	height;

	constructor (width, height, max = 128) {
		this.#objects = [];
		this.#particles = [];
		this.#objectsRemove = [];
		this.#particlesRemove = [];
		this.max = max;

		this.width = width;
		this.height = height;
	}

	// Object Functions
	add (object) {
		this.#objects.push(object);
	}

	addParticle (object) {
		this.#particles.push(object);
	}

	clearObjects() {
		this.#objects = [];
	}

	clearParticles() {
		this.#particles = [];
	}

	remove (object) {
		this.#objectsRemove.push(object);
	}

	removeParticle (object) {
		this.#particlesRemove.push(object);
	}

	#clearObjectsRemove () {
		this.#objectsRemove = [];
	}

	#clearParticlesRemove() {
		this.#particlesRemove = [];
	}

	// Collision Functions
	checkColFor (object1) {
		for (const object2 of this.#objects) {
			if (object1 === object2) {
				continue;
			}

			const overlaps = this.overlap(object1, object2);
			const hasOverlap = object1.overlaps.includes(object2);

			if (overlaps && !hasOverlap) {
				object1.onOverlap(object2);
				object1.overlaps.push(object2);
			} else if (!overlaps && hasOverlap) {
				object1.removeOverlap(object2);
			}
		}
	}

	checkCollision () {
		for (const object of this.#objects) {
			this.checkColFor(object);
		}
	}

	overlap (object1, object2) {
		return object1.x < object2.x + object2.width &&
		       object2.x < object1.x + object1.width &&
			   object1.y < object2.y + object2.height &&
			   object2.y < object1.y + object1.height;
	}

	// Update/Draw
	update () {
		this.updateObjects();
		this.updateParticles();

		for (const object of this.#objectsRemove) {
			this.#objects.splice( this.#objects.indexOf(object), 1 );
		}

		for (const particle of this.#particlesRemove) {
			this.#particles.splice(this.#particles.indexOf(particle), 1);
		}

		this.#clearObjectsRemove();
		this.#clearParticlesRemove();
	}
	
	draw () {
		for (const object of this.#objects) {
			object.draw();
		}
		for (const particle of this.#particles) {
			particle.draw();
		}

		this.drawBorder();
	}

	// Update Functions
	updateObjects () {
		for (const object of this.#objects) {
			if (!object) {
				continue;
			}
			object.update();
			this.checkObjectBounds(object);
		}
	}

	updateParticles () {
		for (const particle of this.#particles) {
			particle.update();
			this.checkObjectBounds(particle);
		}
	}
	
	checkObjectBounds (object) {
		if (object.x < 0) {
			object.position[0] = 0;
		} else if (object.x > this.width - object.width) {
			object.position[0] = this.width - object.width;
		}
		if (object.y < 0) {
			object.position[1] = 0;
		} else if (object.y > this.height - object.height) {
			object.position[1] = this.height - object.height;
		}
	}

	// Draw Functions
	drawBorder () {
		Display.context.strokeStyle = "#000000";
		Display.context.strokeRect(0, 0, this.width, this.height);
	}

}