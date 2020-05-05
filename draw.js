const canvas = document.querySelector(".canvas"); //obtenemos el canvas del html
const ctx = canvas.getContext("2d"); //para dibujar objetos 2d
const scale = 10; //para escalar los objetos en el canvas
const rows = canvas.height / scale; //filas del canvas
const columns = canvas.width / scale; //columnas del canvas

var snake;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickFoodLocation(snake.getTail()); //elegimos la posicion inicial de la fruta, de forma random

    //hacemos los dibujos y actualizaciones en el intervalo de actializacion del canvas establecido
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //actualizamos el canvas (limpiandolo)
        fruit.draw(); //redibujamos la fruta
        snake.update(); //actualizamos los valores de la serpiente
        snake.draw(); //tambien redibujamos la serpiente

        if(snake.eat(fruit)){ //cuando se come la fruta
            fruit.pickFoodLocation(); //se calcula la nueva posicion de la fruta
        }
        snake.checkCollision(); //comprobamos si la cabeza choca con el cuerpo
    }, 60); //velocidad del intervalo en ms
} ());

window.addEventListener('keydown', ((evt) => { //detecta que tecla de presiono
    const direction = evt.key.replace('Arrow', ''); //detectamos que tecla se presiona
    snake.changeDirection(direction); //se envia la direccion para comprobar
}))