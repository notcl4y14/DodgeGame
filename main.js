import Player from "./content/entities/player.js";
import Controls from "./content/controls.js";
import HurtBox from "./content/entities/hurtbox.js";
import Runner from "./core/runner.js";
import World from "./core/world.js";
import Display from "./front/display.js";
import Keyboard from "./front/keyboard.js";
import CustomEvent from "./front/event.js";
import MathUtil from "./util/math.js";
import Level from "./content/states/level.js";
import MainMenu from "./content/states/mainmenu.js";

window.runner = null;
window.world = null;
window.player = null;
window.state = null;

window.onload = () => {
	initCanvas();
	initBinds();
	initEvents();

	runner = new Runner();
	runner.update = update;
	runner.draw = draw;

	world = new World(512, 512);

	// initLevel();

	state = MainMenu;
	state.init();

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

window.initLevel = function() {
	world = new World(512, 512);
	world.clearObjects();
	world.clearParticles();

	state = Level;
	
	player = new Player(world.width / 2 - 10, world.height / 2 - 10, 20, 20, 4);
	player.color = "#0000ff";

	world.add(player);

	const hurtbox1 = new HurtBox(0, 0, 20, 20);
	hurtbox1.setVelocity(2, 2);
	const hurtbox2 = new HurtBox(world.width - 20, 0, 20, 20);
	hurtbox2.setVelocity(-2, 2);
	const hurtbox3 = new HurtBox(0, world.height - 20, 20, 20);
	hurtbox3.setVelocity(2, 2);
	const hurtbox4 = new HurtBox(world.width - 20, world.height - 20, 20, 20);
	hurtbox4.setVelocity(-2, 2);

	world.add(hurtbox1);
	world.add(hurtbox2);
	world.add(hurtbox3);
	world.add(hurtbox4);
}

// Update/Draw
function update() {
	// world.checkColFor(player);
	// world.update();
	state.update();
	checkPlayer();
}

function draw () {
	Display.clearScreen();
	state.draw();

	// Center the World box
	// Display.context.save();
	// Display.context.translate(
	// 	Display.canvas.width / 2 - world.width / 2,
	// 	Display.canvas.height / 2 - world.height / 2
	// );
	
	// world.draw();
	
	// Display.context.restore();
}

// Misc. Functions
function checkPlayer () {
	if (!player) {
		return;
	}

	const borderX = world.width - player.width;
	player.x = MathUtil.clamp(player.x, 0, borderX);

	const borderY = world.height - player.height;
	player.y = MathUtil.clamp(player.y, 0, borderY);
}