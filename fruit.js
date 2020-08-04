class Fruit {
	constructor() {
		this.x;
		this.y;

		this.draw = function() {
			// food border color
			ctx.fillStyle = '#000000';
			ctx.fillRect(this.x, this.y, scale, scale);

			// food color (red)
			ctx.fillStyle = '#e00f0f';
			ctx.fillRect(this.x, this.y, scale - 2, scale - 2);
		};

		this.pickFoodLocation = function(tail) {
			let collision = false;
			do {
				// set random 'x' and 'y' values for food
				this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
				this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;

				for (let i = 0; i < tail.length; i++) {
					// check if new random food position hits tail
					if (this.x === tail[i].x && this.y === tail[i].y) {
						collision = true;
						break;
					}
				}
				// if theres collition, pick new 'x' 'y' values
			} while (collision);
		};
	}
}
