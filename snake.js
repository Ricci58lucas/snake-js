function Snake(){
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    currentDir = "RIGHT";
    this.total = 3;
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
        //se hace un update, shifteando las posiciones de la cola por 1
        for(var i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i+1];
        }

        //gaurdamos coordenadas en un array (total de la cola menos la cabeza)
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
                    this.ySpeed = -scale * 1;
                    this.currentDir = "UP";
                }
            break;
            case 'Down':
                if(this.currentDir != "UP"){
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                    this.currentDir = "DOWN";
                }
            break;
            case 'Left':
                if(this.currentDir != "RIGHT"){
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                    this.currentDir = "LEFT";
                }
            break;
            case 'Right':
                if(this.currentDir != "LEFT"){
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                    this.currentDir = "RIGHT";
                }
            break;
        }
    }

    this.eat = function(fruit){
        if(this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        } else{
            return false;
        }
    }

    this.checkCollision = function(){
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

        if(this.x <= 0){
            this.endGame();
        }

        if(this.y <= 0){
            this.endGame();
        }
        //
    }

    this.endGame = function(){
        document.location.href = "";
    }

    this.getTail = function(){
        return this.tail;
    }
}