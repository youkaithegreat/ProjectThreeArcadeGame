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

    //code to delete the current bug when it reaches the end of the map.
    if (this.x > WIDTH) {
        allEnemies.splice(allEnemies.indexOf(this), 1);
    }
    this.collisionDetect(this);
    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//collisionDetection checks if player has hit an enemy. The 50 px allows the player to get PRETTY close, but it's obvious when overlapping occurs the player "dies"
Enemy.prototype.collisionDetect = function(enemyObj) {
    if ((player.x <= enemyObj.x + 50 && player.x >= enemyObj.x - 50) && (player.y <= enemyObj.y + 50 && player.y >= enemyObj.y - 50)) {
        player = new Player(200, 425, mainChar);
        document.getElementById("score").innerHTML = 'You got run over by a bug! -25!';
        scoreDec(25);
    }
};

//Player class copied from enemy.
var Player = function(x, y, mainChar) {

    this.x = x;
    this.y = y;

    this.sprite = mainChar;

};


//renders the player.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//the update method for player, runs from engine.js checks for various occurences
Player.prototype.update = function() {

    this.checkWin();
    createEnemies();

};

//creates enemies if there are less than 4 on the map. Adds to the array
var createEnemies = function() {
    if (allEnemies.length < 4) {
        var rand = Math.random();
        if (rand < 0.33) {
            rand = 50;
        } else if (rand > 0.66) {
            rand = 140;
        } else {
            rand = 230;
        }
        var enemy = new Enemy(0, rand, TILE_SIZE);

        allEnemies.push(enemy);
    }
};


//simple input. Used switch for convenience.
Player.prototype.handleInput = function(keyPush) {

    document.getElementById("info").innerHTML = 'Get to the Water!';
    switch (keyPush) {
        case 'left':
            if (this.boundsDetect(this.x - TILE_SIZE, this.y)) {
                this.x -= TILE_SIZE;
            }
            break;
        case 'up':
            if (this.boundsDetect(this.x, this.y - TILE_SIZE)) {
                this.y -= TILE_SIZE;
            }
            break;
        case 'right':
            if (this.boundsDetect(this.x + TILE_SIZE, this.y)) {
                this.x += TILE_SIZE;
            }
            break;
        case 'down':
            if (this.boundsDetect(this.x, this.y + TILE_SIZE)) {
                this.y += TILE_SIZE;
            }
            break;
        default:
            break;
    }
};

//various score manipulators. Global "score" since it is a one instance game
var scoreInc = function(inc) {
    score += inc;
    document.getElementById("score").innerHTML = 'Score: ' + score;
};

var scoreDec = function(dec) {
    score -= dec;
    document.getElementById("score").innerHTML = 'Score: ' + score;
};

//Detects if player is in bounds or not. Subtracts points, updates h3 on index.html
Player.prototype.boundsDetect = function(x, y) {
    if (x > 495 || x < 0 || y > 500 || y < -100) {
        return false;
    } else
        return true;
};

//check if player wins, resets game.
Player.prototype.checkWin = function() {
    if (this.y > -100 && this.y < 0) {
        scoreInc(50);
        document.getElementById("info").innerHTML = 'You win! + 50!';
        player = new Player(200, 425, mainChar);
    }
};

//document.getElementById("char").onclick = function(){changeChar()};

function changeChar() {

    counter++;
    console.log(counter);
    switch (counter % 3) {
        /* case 0:
         mainChar = 'images/char-cat-girl.png';
         break;
         case 1 :
         mainChar = 'images/char-horn-girl.png';
         break;
         case 2:
         mainChar = 'images/char-pink-girl.png';
         break;
         case 3:
         mainChar = 'images/char-princess-girl.png';
         break; */
        case 0:
            mainChar = 'images/enemy-bug.png';
            break;
        /*  case 1:
         mainChar = 'images/Heart.png';
         break;*/
        case 1:
            mainChar = 'images/stone-block.png';
            break;
        case 2:
            mainChar = 'images/char-boy.png';
            break;
    }
    player = new Player(200, 425, mainChar);

    /* Tried to implement this change character section, but I don't think the char-girl.png's are working for me? I get a weird error even if I use it directly at player.this.sprite.
     I can get it to change to the stone-block .. but not the girls...
     */
}


//initial instantiation
var allEnemies = [];

//global variables for one instance of the game
var TILE_SIZE = 100;
var WIDTH = 450;
var score = 0;
var counter = 0;
var mainChar = 'images/char-boy.png';

var player = new Player(200, 425, mainChar);


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