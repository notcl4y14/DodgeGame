export default class CustomEvent {

	static #events = {};

	static addEvent (name) {
		this.#events[name] = [];
	}
	
	static addListener (eventName, func, ref) {
		this.#events[eventName].push({func, ref});
	}

	static clearEvents () {
		for (const event of this.events) {
			this.clearListeners(event);
		}
	}

	static clearListeners (event) {
		// const length = event.length;

		const linkedListeners = event.filter( (value) => value.ref != undefined );
		event = linkedListeners;

		// for (let i = 0; i < length; i++) {
		// 	if (!event[i].ref) {
		// 		event.splice(i, 1);
		// 	}
		// }
	}

	static invokeEvent (name, options = {}) {
		const events = this.#events[name];
		for (const listener of events) {
			listener.func.call(listener.ref, options);
		}
	}
	
}