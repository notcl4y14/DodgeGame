export default class Keyboard {

	static #keys = {};

	static setKey (key, value) {
		this.#keys[key] = value;
	}

	static isKeyDown (key) {
		return this.#keys[key] === true;
	}

	static isKeyUp (key) {
		return this.#keys[key] == false;
	}

}