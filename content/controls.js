import Keyboard from "../front/keyboard.js";

export default class Controls {

	static controlMap = {};

	static bindControl (name, key) {
		this.controlMap[name] = key;
	}

	static isDown (name) {
		return Keyboard.isKeyDown(this.controlMap[name]);
	}
	
}