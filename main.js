import Player from "./content/entities/player.js";
import Controls from "./content/controls.js";
import HurtBox from "./content/entities/hurtbox.js";
import Runner from "./core/runner.js";
import World from "./core/world.js";
import Display from "./front/display.js";
import Keyboard from "./front/keyboard.js";
import CustomEvent from "./front/event.js";
import MathUtil from "./util/math.js";

window.runner = null;
window.world = null;
window.player = null;
window.hurtbox = null;

window.onload = () => {
	initCanvas();
	initBinds();
	initEvents();

	runner = new Runner();
	runner.update = update;
	runner.draw = draw;

	world = new World(512, 512);

	player = new Player(10, 10, 20, 20, 4);
	player.color = "#0000ff";

	hurtbox = new HurtBox(100, 10, 20, 20);
	hurtbox.setVelocity(1, 1);

	world.add(hurtbox);

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

// Init Functions
function initCanvas() {
	Display.linkCanvas(document.querySelector('canvas'));
	Display.updateCanvasSize();
}

function initBinds() {
	Controls.bindControl("MoveLeft", "ArrowLeft");
	Controls.bindControl("MoveRight", "ArrowRight");
	Controls.bindControl("MoveUp", "ArrowUp");
	Controls.bindControl("MoveDown", "ArrowDown");
	Controls.bindControl("Dash", "ShiftLeft");
	Controls.bindControl("Walk", "ControlLeft");
}

function initEvents() {
	CustomEvent.addEvent("keydown");
	CustomEvent.addEvent("keyup");
}

// Update/Draw
function update () {
	world.checkColFor(player);
	player.update();
	checkPlayer();
	world.update();
}

function draw () {
	Display.clearScreen();

	// Center the World box
	Display.context.save();
	Display.context.translate(
		Display.canvas.width / 2 - world.width / 2,
		Display.canvas.height / 2 - world.height / 2
	);
	
	player.draw();
	world.draw();
	
	Display.context.restore();
}

// Misc. Functions
function checkPlayer () {
	const borderX = world.width - player.width;
	player.x = MathUtil.clamp(player.x, 0, borderX);

	const borderY = world.height - player.height;
	player.y = MathUtil.clamp(player.y, 0, borderY);
}