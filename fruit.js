function Fruit(){
    this.x;
    this.y;

    this.draw = function(){

        ctx.fillStyle = "#000000"; //pintamos el "borde" de negro
        ctx.fillRect(this.x, this.y, scale, scale);

        ctx.fillStyle = "#e00f0f"; //seteamos el color de la fruta de rojo
        ctx.fillRect(this.x, this.y, scale - 2, scale - 2); //dibujamos la fruta en la posicion random

    }

    this.pickFoodLocation = function(tail) {
        do{ //mientras exista una colision...
            collision = false;
            //math.floor redondea hacia abajo el valor
            this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale; //calculamos la posicion x random de la fruta
            this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale; //hacemos lo mismo con la pos y

            for(var i = 0; i < tail.length; i++){
                //se comprueba si la pos de la fruta choca con el cuerpo
                if(this.x === tail[i].x && this.y === tail[i].y) {
                    collision = true;
                    break; //terminamos el "for", porque sabemos que hubo al menos una colision
                }
            }
        }while(collision);
    }
}