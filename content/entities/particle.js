import Box from "../../core/box.js";
import Display from "../../front/display.js";
import RGBColor from "../../util/rgbcolor.js";

export default class Particle extends Box {
	
	alpha;
	alphaDec;
	colorBase;
	
	setAlphaSettings (alpha, alphaDec) {
		this.alpha = alpha;
		this.alphaDec = alphaDec;
	}

	setColorBase(r, g, b) {
		this.colorBase = [r, g, b];
	}

	setColor (color) {
		const rgb = new RGBColor(color);
		this.setColorBase(rgb.r, rgb.g, rgb.b);
	}

	updateAlpha () {
		this.alpha -= this.alphaDec;

		if (this.alpha <= 0) {
			this.destroy();
		}
	}

	draw () {
		const r = this.colorBase[0];
		const g = this.colorBase[1];
		const b = this.colorBase[2];
		Display.context.fillStyle = `rgba(${r},${g},${b},${this.alpha}`;
		Display.context.fillRect(this.x, this.y, this.width, this.height);
	}
	
}