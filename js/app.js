"use strict"; // Enables strict mode to catch common bloopers

// TODO: Disable player movement when modal opened?

// Note: In a constructor function "this" does not have a value. It is a substitute for the new object. The value of this will become the new object when a new object is created

// Note commas not used to separate methods and properties in a class
class Player {
  // Constructor function, a special function just for initializing new objects, will automatically run when a new object is constructed (with keyword "new") from this class. Contains data needed to create it
  constructor(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  // Methods that all objects created from class will inherit. Would exist on prototype in pre-class way of writing it, but effect is the same (the following methods still exist on Player prototype [for example would be Player.prototype.update = function(dt)...])

  // When player reaches water, opens modal, moves player back to starting position
  update(dt) {
    if (this.y === 25) {
  		bringUpModal();
      this.x = 200;
      this.y = 400;
  	}
  }

  // Draws player on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  // Connects keyboard input to player movement. If statements prevent player movement off screen
  handleInput(allowedKeys) {

    if (allowedKeys === 'down' && this.y < 425) {
      this.y += 25;
    }

		if (allowedKeys === 'up') {
			this.y -= 25;
		}

		if (allowedKeys === 'left' && this.x > 0) {
			this.x -= 25;
		}

		if (allowedKeys === 'right' && this.x < 400) {
			this.x += 25;
		}
  }
}

class Enemy {
// Sets enemy's initial location
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    // Sets speed of enemy
    this.speed = speed;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    // Multiplies enemy's movement by time delta to ensure game runs at same speed for all computers
    this.x += this.speed * dt;
    // Once enemy finished moving across screen, moves it back so it can cross screen again and randomizes its speed
    if (this.x > 500) {
      this.x = -75;
      // Math.random() function returns random number between 0 (inclusive) and 1 (exclusive). Math.floor() returns the largest integer less than or equal to a given number
      this.speed = 70 + Math.floor(Math.random() * 450);
    }

    // Resets player position upon colliding with enemy
  	if (player.x < this.x + 70 && player.x + 17 > this.x && player.y < this.y + 45 && 30 + player.y > this.y) {
  		player.x = 200;
  		player.y = 400;
    }
  }

  // Draws enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// ENEMY/PLAYER OBJECT INSTANTIATION

let enemyPosition = [60, 140, 220];

let allEnemies = [];

let player = new Player(200, 400, 50);

enemyPosition.forEach(function(posY) {
  let enemy = new Enemy(0, posY, 70 + Math.floor(Math.random() * 450));
  allEnemies.push(enemy);
});

// Modal

const modal = document.getElementById('myModal');
const closeIcon = document.querySelector('.close');

// When called, adds class that sets modal to display: block when player reaches water
function bringUpModal() {
  modal.classList.add('modal-visible');
}

// Closes modal (adding class that sets it back to display: none) upon user's clicking its close icon
closeIcon.addEventListener('click', function() {
  modal.classList.remove('modal-visible');
});

// Closes modal when key is pressed down (note: keydown used instead of keypress because keypress only works for keys that produce a character value)
document.addEventListener('keydown', function(e) {
  let keyCode = e.keyCode;
  if (keyCode === 27) {
    modal.classList.remove('modal-visible');
  }
});

// Listens for key presses (the keyup event is fired when a key is released) and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
