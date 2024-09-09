export default class Keyboard {

	static #keys = {};
	static #keysPressed = {};

	static setKey (key, value) {
		this.#keys[key] = value;
		this.#keysPressed[key] = value;

		this.#keyPress(key, 0);
	}

	static isKeyDown (key) {
		return this.#keys[key] === true;
	}

	static isKeyUp (key) {
		return this.#keys[key] == false;
	}

	static isKeyPressed (key) {
		return this.#keysPressed[key] === true;
	}

	static async #keyPress (key, time) {
		if (time >= 1) {
			this.#keysPressed[key] = false;
			return;
		}

		requestAnimationFrame( () => this.#keyPress.call(this, key, time + 1) );
	}

}