export default class World {

	#objects;
	max;

	constructor (max = 128) {
		this.#objects = [];
		this.max = max;
	}

	// Object Functions
	add (object) {
		this.#objects.push(object);
	}

	remove (object) {
		this.#objects.splice( this.#objects.indexOf(object), 1 );
	}

	// Collision Functions
	checkColFor (object1) {
		for (const object2 of this.#objects) {
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

	overlap (object1, object2) {
		return object1.x < object2.x + object2.width &&
		       object2.x < object1.x + object1.width &&
			   object1.y < object2.y + object2.height &&
			   object2.y < object1.y + object1.height;
	}

	// Update/Draw
	update () {
		for (const object of this.#objects) {
			object.update();
		}
	}
	
	draw () {
		for (const object of this.#objects) {
			object.draw();
		}
	}

}