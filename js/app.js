var tileSize = 100;
var score = 0;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.random() * speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x > 450){
        allEnemies.splice(allEnemies.indexOf(this), 1);
    }
    collisionDetect(this);
    this.x += dt*this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var collisionDetect = function(enemyObj){
    if((player.x <= enemyObj.x + 50 && player.x >= enemyObj.x - 50) && (player.y <= enemyObj.y +50 && player.y >= enemyObj.y - 50)){
        player = new Player(200, 425, 0);
        scoreDec(25);
        document.getElementById("score").innerHTML = "You got run over by a bug! -25!";
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){


    this.x = x;
    this.y = y;

    this.sprite='images/char-boy.png';

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(){
    boundsDetect(this);
    checkWin(this);
    createEnemies();

};

var createEnemies = function(){
    if(allEnemies.length < 4){
        var rand = Math.random();
        if(rand <.33){
            rand = 50;
        }else if (rand > .66){
            rand = 140;
        }else
        {
            rand = 230;
        }
        var enemy = new Enemy(0, rand, tileSize);

        allEnemies.push(enemy);
    }

};

Player.prototype.handleInput = function(keyPush){

    document.getElementById("info").innerHTML = "Get to the Water!";
    switch(keyPush){
        case 'left': this.x-=tileSize; break;
        case 'up' : this.y-=tileSize;break;
        case 'right': this.x+=tileSize;break;
        case 'down' : this.y+=tileSize;break;
        default: break;
    }
};

var scoreInc = function(inc){
    score += inc;
    document.getElementById("score").innerHTML = "Score: "+ score;
};

var scoreDec = function(dec){
    score-=dec;
    document.getElementById("score").innerHTML = "Score: "+ score;
};


var boundsDetect = function(varPlayer){
    if(varPlayer.x > 495 || varPlayer.x < 0 || varPlayer.y > 500|| varPlayer.y <-100 ){
        document.getElementById("info").innerHTML = "Out of Bounds! - 5!";
        scoreDec(5);
        player = new Player(200, 425);
    }
};

var checkWin = function(varPlayer){
  if(varPlayer.y >-100 && varPlayer.y < 0){
      scoreInc(50);
      document.getElementById("info").innerHTML = "You win! + 50!";
      player = new Player(200, 425);
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 425, 0);





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
