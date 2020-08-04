/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const canvas = document.querySelector('.canvas');
// 2d object drawing library
const ctx = canvas.getContext('2d');
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let dir;

(function setup() {
	snake = new Snake();
	fruit = new Fruit();
	// fruit location uses tail to avoid overlapping
	fruit.pickFoodLocation(snake.getTail());

	window.setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		fruit.draw();
		snake.update();
		snake.draw();
		snake.changeDirection(dir);

		// check if snake touched fruit
		if(snake.eat(fruit)) {
			// if so, pick new food location
			fruit.pickFoodLocation(snake.getTail());
		}

		if(snake.checkAnyCollision()) {
			// reload page
			document.location.href = '';
		}

		// set window update interval in ms
	}, 60);
});

window.addEventListener('keydown', ((evt) => {
	// listen to arrow keys
	dir = evt.key.replace('Arrow', '');
}));