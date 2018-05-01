canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
buttonPushed = false;
counter = 0;
highscore = 0;

pre_load();

start = function() {
    window.onload = function() {
        game = new Game();
        game.draw();

        setInterval(update,30); 
    }    
}

update = function() {
    if(!game.start) {
        return false;
    }

    if(counter % 60 == 0) {
        game.pipes.push(new Pipe());
    }
    counter++;
    if(buttonPushed) {
        game.bird.jump();
        buttonPushed = false;
    }

    game.update();
    game.draw();
}

var Game = function() {
    this.score = 0;
    this.bird = new Bird();
    this.pipes = new Array();
    start = false;
}

Game.prototype.draw = function() {
    context.drawImage(imgs[0],0,0);    

    this.bird.draw();

    for(i = 0; i< this.pipes.length; i++) {
        this.pipes[i].draw();
    }

    context.font = "16px Arial";
    context.fillStyle = "white";
    context.textAlign = "left";
    context.fillText("SCORE: " + this.score, 10, 30); 
    context.fillText("HIGHSCORE: " + highscore, 10, 50); 

    if(!this.start) {
        context.font = "24px Arial";
        context.strokeStyle = 'black';
        context.textAlign = "center";
        context.fillText("FlappyPhant", canvas.width/2, canvas.height/2 + 90); 

        context.font = "16px Arial";
        context.strokeStyle = 'black';
        context.textAlign = "center";
        context.fillText("PRESS SPACE TO START", canvas.width/2, canvas.height/2 + 120);      
    }
}

Game.prototype.update = function() {
    this.bird.update();
    for(i = 0; i< this.pipes.length; i++) {
        this.pipes[i].update();
    }    

    for(i = 0; i< this.pipes.length; i++) {
        this.pipes[i].checkCollision(this.bird);
    }
}

Game.prototype.reset = function() {
    counter = 0;
    game = new Game();
}

var Bird = function() {
    this.width = 50;
    this.height = 42;
    this.x = canvas.width/2 - this.width/2;
    this.y = canvas.height/2;
    this.gravity = 0;
    this.velocity = 1;
    this.modifier = 1;
}

Bird.prototype.update = function() {
    this.gravity += this.velocity;
    this.y += this.gravity * this.modifier;

    if(this.y < 0 || this.y > canvas.height) {
        game.reset();
    }
}

Bird.prototype.draw = function() {
    var bird = this;
 
    if(this.modifier == 1) {
        context.drawImage(imgs[1], bird.x, bird.y, bird.width, bird.height);    
    } else {
        context.drawImage(imgs[5], bird.x, bird.y, bird.width, bird.height);  
    }
}

Bird.prototype.jump = function() {
    this.gravity = -12;
}

var Pipe = function() {
    this.speed = 4;
    this.gap =150;
    this.width = 60;
    this.top = Math.floor((Math.random() * (canvas.height - this.gap - 50)));
    this.bottom = this.top + this.gap;
    this.x = canvas.width;
    this.checked = false;
    if(Math.floor(Math.random() * 3) == 1) {
        this.special = 1;
    } else {
        this.special = 0;
    }
}

Pipe.prototype.draw = function() {
    var pipe = this;

    context.drawImage(imgs[2], pipe.x, 0, pipe.width, pipe.top-6);
    context.drawImage(imgs[3], pipe.x, pipe.top-6, pipe.width, 6);

    if(this.special) {
        context.drawImage(imgs[4], pipe.x, pipe.top, pipe.width, pipe.gap);    
    }

    context.drawImage(imgs[3], pipe.x, pipe.bottom, pipe.width, 6);
    context.drawImage(imgs[2], pipe.x, pipe.top + pipe.gap + 6, pipe.width, canvas.height - pipe.bottom)        

}

Pipe.prototype.update = function() {
    this.x -= this.speed;
}

Pipe.prototype.checkCollision = function(bird) {
    if(this.x < (bird.x + bird.width) && this.x > (bird.x - bird.width)) {
        if(this.top > bird.y || bird.y + bird.height > this.bottom) {
            game.reset(); 
        }
    }

    if(this.x < bird.x - 5 && !this.checked) {
        this.checked = true;
        game.score++;
        if(this.special == 1) {
            bird.modifier = bird.modifier * -1;
        }
        if(game.score > highscore) {
            highscore = game.score;
        }
    }
}

document.body.onkeydown = function(e){
    if(e.keyCode == 32){
        button_pushed();
    }
}

var button_pushed = function() {
    if(!game.start) {
        game.start = true;
    }
    buttonPushed = true;    
}



function pre_load(){

    imgURLs = ['bg', 'bird', 'tube_body', 'tube_head', 'beam', 'bird2'];
    imgs=[];
    imgCount=0;

    for(var i=0;i<imgURLs.length;i++){

        var img=new Image();
        imgs.push(img);
        img.onload=function(){
            if(++imgCount>=imgs.length){ 
                start(); 

            }
        }
        img.src= "img/"+imgURLs[i]+".png";
    }
}