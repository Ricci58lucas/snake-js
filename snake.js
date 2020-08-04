class Snake {
	constructor() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.currentDir = '';
		this.total = 0;
		this.tail = [];

		// draws head and tail
		this.draw = function() {
			// draw head and tail green with black border
			for (let i = 0; i < this.tail.length; i++) {
				this.drawRect_with_Border(this.tail[i].x, this.tail[i].y, scale, scale, 2, '#0b9e11');
			}
			this.drawRect_with_Border(this.x, this.y, scale, scale, 2, '#0b9e11');
		};

		this.drawRect_with_Border = function(xPos, yPos, widthPos, heightPos, borderThickness, color) {
			// paint head and tail border black
			ctx.fillStyle = '#000000';
			ctx.fillRect(xPos, yPos, widthPos, heightPos);

			// paint head and tail color
			ctx.fillStyle = color;
			ctx.fillRect(xPos, yPos, widthPos - borderThickness, heightPos - borderThickness);
		};

		this.update = function() {
			// updates tail square positions
			for (let i = 0; i < this.tail.length - 1; i++) {
				this.tail[i] = this.tail[i + 1];
			}

			// once tail is updated, change head position
			this.tail[this.total - 1] = { x: this.x, y: this.y };

			// update 'x' 'y' positions (movement)
			this.x += this.xSpeed;
			this.y += this.ySpeed;
		};

		this.changeDirection = function(direction) {
			switch (direction) {
			case 'Up':
				if (this.currentDir != 'DOWN') {
					this.xSpeed = 0;
					this.ySpeed = -scale;
					this.currentDir = 'UP';
				}
				break;
			case 'Down':
				if (this.currentDir != 'UP') {
					this.xSpeed = 0;
					this.ySpeed = scale;
					this.currentDir = 'DOWN';
				}
				break;
			case 'Left':
				if (this.currentDir != 'RIGHT') {
					this.xSpeed = -scale;
					this.ySpeed = 0;
					this.currentDir = 'LEFT';
				}
				break;
			case 'Right':
				if (this.currentDir != 'LEFT') {
					this.xSpeed = scale;
					this.ySpeed = 0;
					this.currentDir = 'RIGHT';
				}
				break;
			}
		};

		this.eat = function(fruit) {
			// check if head ate fruit
			if (this.x === fruit.x && this.y === fruit.y) {
				this.total++;
				return true;
			}
			return false;
		};

		this.checkAnyCollision = function() {
			// ckeck if head hit tail
			for (let i = 0; i < this.tail.length; i++) {
				if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
					return true;
				}
			}

			// check if head hit canvas border
			if (this.x >= canvas.width) {
				return true;
			}
			if (this.y >= canvas.height) {
				return true;
			}
			if (this.x < 0) {
				return true;
			}
			if (this.y < 0) {
				return true;
			}
			//
		};

		this.endGame = function() {
			// reload page
			document.location.href = '';
		};

		this.getTail = function() {
			return this.tail;
		};
	}
}
