import Keyboard from "../front/keyboard.js";

export default class Controls {

	static controlMap = {};

	static bindControl (name, key) {
		this.controlMap[name] = key;
	}

	static getBind (name) {
		return this.controlMap[name];
	}

	static isDown (name) {
		return Keyboard.isKeyDown(this.controlMap[name]);
	}
	
}