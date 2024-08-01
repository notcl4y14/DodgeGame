import Runner from "./core/runner.js";
import Display from "./front/display.js";
import Keyboard from "./front/keyboard.js";
import CustomEvent from "./front/event.js";
import Player from "./content/entities/player.js";
import Controls from "./content/controls.js";
import HurtBox from "./content/entities/hurtbox.js";

window.runner = null;
window.player = null;
window.hurtbox = null;

window.onload = () => {
	Display.linkCanvas(document.querySelector('canvas'));
	Display.updateCanvasSize();

	Controls.bindControl("MoveLeft", "ArrowLeft");
	Controls.bindControl("MoveRight", "ArrowRight");
	Controls.bindControl("MoveUp", "ArrowUp");
	Controls.bindControl("MoveDown", "ArrowDown");
	Controls.bindControl("Dash", "ShiftLeft");

	CustomEvent.addEvent("keydown");
	CustomEvent.addEvent("keyup");

	runner = new Runner();
	runner.update = update;
	runner.draw = draw;

	// console.log(runner);

	player = new Player(10, 10, 20, 20, 4);
	player.color = "#0000ff";

	// console.log(player);

	hurtbox = new HurtBox(100, 10, 20, 20);

	runner.run();
}

window.onresize = () => {
	Display.updateCanvasSize();
}

window.onkeydown = (event) => {
	Keyboard.setKey(event.code, true);
	CustomEvent.invokeEvent("keydown", event);
}

window.onkeyup = (event) => {
	Keyboard.setKey(event.code, false);
	CustomEvent.invokeEvent("keyup", event);
}

// Update/Draw
function update () {
	player.update();
	hurtbox.update();
}

function draw () {
	Display.clearScreen();
	player.draw();
	hurtbox.draw();
}