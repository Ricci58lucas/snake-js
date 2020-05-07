function Snake(){
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.currentDir = "";
    this.total = 0;
    this.tail = [];

    this.draw = function(){
        for(let i = 0; i < this.tail.length; i++){ //recorremos la cola
            this.drawRect_With_Border(this.tail[i].x, this.tail[i].y, scale, scale, 2, "#0b9e11");
        }
        this.drawRect_With_Border(this.x, this.y, scale, scale, 2, "#0b9e11");
    }

    //para dibujar el borde, se dibuja un cuadrado negro, y otro (de otro color y mas chico) por encima
    this.drawRect_With_Border = function(xPos, yPos, widthPos, heightPos, borderThickness, color){
        ctx.fillStyle = "#000000"; //pintamos el "borde" de negro
        ctx.fillRect(xPos, yPos, widthPos, heightPos);

        ctx.fillStyle = color; //pintamos la cola (cada cuadrado)
        ctx.fillRect(xPos, yPos, widthPos-borderThickness, heightPos-borderThickness);
    }

    this.update = function(){
        //para que la cola "siga" a la cabeza...
        for(var i = 0; i < this.tail.length - 1; i++){
            //hay que asignar la posicion (dentro del canvas) del elemento siguiente al anterior
            //de esta forma, el elemento "anterior" adopatara la posiscion de su consiguiente dentro del canvas
            this.tail[i] = this.tail[i+1];
        }

        //guardamos las coordenadas de la cabeza al final del array
        this.tail[this.total - 1] = { x: this.x, y: this.y };

        //se suma la velocidad a la posicion
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    this.changeDirection = function(direction){
        switch(direction){
            case 'Up':
                if(this.currentDir != "DOWN"){
                    this.xSpeed = 0;
                    this.ySpeed = -scale; //y-- es arriba
                    this.currentDir = "UP";
                }
            break;
            case 'Down':
                if(this.currentDir != "UP"){
                    this.xSpeed = 0;
                    this.ySpeed = scale; //y++ es abajo
                    this.currentDir = "DOWN";
                }
            break;
            case 'Left':
                if(this.currentDir != "RIGHT"){
                    this.xSpeed = -scale; //x-- es izquierda
                    this.ySpeed = 0;
                    this.currentDir = "LEFT";
                }
            break;
            case 'Right':
                if(this.currentDir != "LEFT"){
                    this.xSpeed = scale; //x++ es derecha
                    this.ySpeed = 0;
                    this.currentDir = "RIGHT";
                }
            break;
            //c++
        }
    }

    this.eat = function(fruit){
        //comprobamos que la cabeza este donde esta la fruta
        if(this.x === fruit.x && this.y === fruit.y) {
            this.total++; //sumamos 1 la total (es decir, nos alargamos)
            return true;
        } else{
            return false;
        }
    }

    this.checkAnyCollision = function(){
        for(var i = 0; i < this.tail.length; i++){
            //se comprueba si la pos de la cabeza choca con el cuerpo
            if(this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.endGame();
            }
        }
        //se comprueba si la pos de la cabeza sobrepasa algun borde
        if(this.x >= canvas.width){
            this.endGame();
        }
        if(this.y >= canvas.height){
            this.endGame();
        }
        if(this.x < 0){
            this.endGame();
        }
        if(this.y < 0){
            this.endGame();
        }
        //
    }

    this.getTail = function(){
        return this.tail;
    }

    this.endGame = function(){
        document.location.href = ""; //f5 reloadear la pagina
    }
}