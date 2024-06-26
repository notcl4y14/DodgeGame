class Context {
	constructor (canvas) {
		this._ctx = canvas.getContext("2d");
	}

	// ============================== //
	// Canvas
	// ============================== //

		get canvas () {
			return this._ctx.canvas;
		}
		
		fillCanvasToWindow () {
			// Somehow, the font changes upon resizing the canvas
			let oldFont = this.font;
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.font = oldFont;
		}

		save() {
			this._ctx.save();
		}

		restore() {
			this._ctx.restore();
		}

	// ============================== //

	// ============================== //
	// Graphics
	// ============================== //
	
		get lineWidth () {
			return this._ctx.lineWidth;
		}

		set lineWidth (v) {
			this._ctx.lineWidth = v;
		}

		get shadowBlur () {
			return this._ctx.shadowBlur;
		}

		set shadowBlur (v) {
			this._ctx.shadowBlur = v;
		}

		get shadowColor () {
			return this._ctx.shadowColor;
		}

		set shadowColor (v) {
			this._ctx.shadowColor = v;
		}

		beginPath () {
			this._ctx.beginPath();
		}

		closePath () {
			this._ctx.closePath();
		}

		// ============================== //
		// Stroke
		// ============================== //

			get strokeStyle () {
				return this._ctx.strokeStyle;
			}

			set strokeStyle (v) {
				this._ctx.strokeStyle = v;
			}

			// ============================== //

			stroke () {
				this._ctx.stroke();
			}

			// ============================== //

			strokeRect (x, y, width, height) {
				this._ctx.strokeRect(x, y, width, height);
			}

			strokeCircle (x, y, radius, start = 0, end = 2*Math.PI, counterClockwise = undefined) {
				this.circle(x, y, radius, start, end, counterClockwise);
				this.stroke();
			}

			strokeText (text, x, y, maxWidth = undefined) {
				this._ctx.strokeText(text, x, y, maxWidth);
			}

		// ============================== //

		// ============================== //
		// Fill
		// ============================== //

			get fillStyle () {
				return this._ctx.fillStyle;
			}

			set fillStyle (v) {
				this._ctx.fillStyle = v;
			}

			// ============================== //

			fill () {
				this._ctx.fill();
			}

			// ============================== //

			fillRect (x, y, width, height) {
				this._ctx.fillRect(x, y, width, height);
			}

			fillCircle (x, y, radius, start = 0, end = 2*Math.PI, counterClockwise = undefined) {
				this.circle(x, y, radius, start, end, counterClockwise);
				this.fill();
			}

			fillText (text, x, y, maxWidth = undefined) {
				this._ctx.fillText(text, x, y, maxWidth);
			}

		// ============================== //

		// ============================== //
		// Shapes
		// ============================== //

			rect (x, y, width, height) {
				this._ctx.rect(x, y, width, height);
			}

			arc (x, y, radius, start = 0, end = 2*Math.PI, counterClockwise = undefined) {
				this._ctx.arc(x, y, radius, start, end, counterClockwise);
			}

			circle (x, y, radius, start = 0, end = 2*Math.PI, counterClockwise = undefined) {
				this._ctx.beginPath();
				this._ctx.arc(x, y, radius, start, end, counterClockwise);
				this._ctx.closePath();
			}

		// ============================== //

		// ============================== //
		// Shapes
		// ============================== //
		
			drawImage (img, x, y, dw, dh) {
				this._ctx.drawImage(img, x, y, dw, dh);
			}

		// ============================== //

	// ============================== //

	// ============================== //
	// Text & Font
	// ============================== //

		set textAlign (v) {
			this._ctx.textAlign = v;
		}

		get textAlign () {
			return this._ctx.textAlign;
		}

		// ============================== //

		set textBaseline (v) {
			this._ctx.textBaseline = v;
		}

		get textBaseline () {
			return this._ctx.textBaseline;
		}

		// ============================== //

		measureText (text) {
			return this._ctx.measureText(text);
		}

		// ============================== //

		set font (v) {
			this._ctx.font = v;
		}

		get font () {
			return this._ctx.font;
		}

		// ============================== //

		set fontSize (px) {
			let result = this._ctx.font.replace(/[0-9]+/g, px);
			this._ctx.font = result;
		}

		get fontSize () {
			let result = this._ctx.font.match(/[0-9]+/g);
			return result;
		}

	// ============================== //
}