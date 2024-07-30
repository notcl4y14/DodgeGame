import Runner from "./core/runner.js";
import Display from "./front/display.js";
import Keyboard from "./front/keyboard.js";
import Player from "./content/entities/player.js";
import Controls from "./content/controls.js";

let runner = null;
let player = null;

window.onload = () => {
	Display.linkCanvas(document.querySelector('canvas'));
	Display.updateCanvasSize();

	Controls.bindControl("MoveLeft", "ArrowLeft");
	Controls.bindControl("MoveRight", "ArrowRight");
	Controls.bindControl("MoveUp", "ArrowUp");
	Controls.bindControl("MoveDown", "ArrowDown");

	runner = new Runner();
	runner.update = update;
	runner.draw = draw;

	player = new Player(10, 10, 20, 20);
	player.speed = 4;
	player.color = "#0000ff";

	runner.run();
}

window.onresize = () => {
	Display.updateCanvasSize();
}

window.onkeydown = (event) => {
	Keyboard.setKey(event.code, true);
}

window.onkeyup = (event) => {
	Keyboard.setKey(event.code, false);
}

// Update/Draw
function update () {
	player.update();
}

function draw () {
	Display.clearScreen();
	player.draw();
}