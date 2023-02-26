var initialBlocks = 2; // Initial number of blocks for the a new snake

// All instacnes of objects that we need
var game = new Game();
var grid = new Grid();
var player = new Snake(Math.floor((Math.random()* game.rows-2) + 2), Math.floor((Math.random()* game.cols-2) + 2), [0, 255, 0], [255, 150, 0]);
var robot = new Snake(Math.floor((Math.random()* game.rows-2) + 2), Math.floor((Math.random()* game.cols-2) + 2), [200, 200, 200], [255, 0, 255]);
var apple = new Apple(Math.floor((Math.random()* game.rows-2) + 2), Math.floor((Math.random()* game.cols-2) + 2));


// setup the canvas
function setup() {
	createCanvas(game.theWidth, game.theHeight);
	frameRate(5); // sets frame rate to 5 fps (calls draw callback function 5 times in a second)
}

// takes in a cell object as parameter and draws a rectangle dependant on its properties
function drawCell(cell) {
	fill(0);
	stroke(150);
	
	rect(cell.x, cell.y, game.cellWidth-1, game.cellHeight-1);
}

// draws the grid by drawing each cell
function drawGrid() {
	for (var i = 0; i < game.rows; i++) {
		for (var j = 0; j < game.cols; j++) {
			drawCell(grid.cells[i][j]);
		}
	}
}


// guide the robot to eat the apple
var makeRobotEatApple = function() {
    var robotHead = robot.cells[0];
    
    
    if (robot.i + robotHead[0] < apple.i && robot.canMove(39)) {
        robot.direction = 39;
    }
    
    else if (robot.i + robotHead[0] > apple.i && robot.canMove(37)) {
        robot.direction = 37;
    }
    
    else if (robot.j + robotHead[1] < apple.j && robot.canMove(40)) {
        robot.direction = 40;
    }
    
    else if (robot.j + robotHead[1] > apple.j && robot.canMove(38)) {
        robot.direction = 38;
    }
    
    else if (robot.i + robotHead[0] === apple.i) {
        robot.direction = 39;
    }
    
    else if (robot.j + robotHead[1] === apple.j) {
        robot.direction = 38;
    }
};


// Draws a snake on the grid, given a Snake object
function drawSnake(snake) {
	for (var i = 0; i < snake.cells.length; i++) {
        
        
        if (i === 0) {
            fill(snake.headColor);
        } else {
            fill(snake.bodyColor);
        }
        
        if (snake.cells[0][0] === snake.cells[i][0] && snake.cells[0][1] === snake.cells[i][1] && i > 2) {
            snake.score--;
            snake.cells.pop();
        }
        
        if (snake.score < 0) {
			game.gameOver = true;
		}
        
        
        if (snake.i + snake.cells[i][0] === apple.i && snake.j + snake.cells[i][1] === apple.j) {
            apple.resetPosition();
        }
        
        stroke(0);
        rect((snake.cells[i][0]+snake.i)*game.cellWidth, (snake.cells[i][1]+snake.j)*game.cellHeight, game.cellWidth, game.cellHeight);
        
    }
}
	
	
// draws the apple
function drawApple() {
	apple.color = [255, 255-apple.transparency, 0, apple.transparency];
	apple.transparency -= 8;
	
	fill(apple.color);
	rect(apple.i*game.cellWidth, apple.j*game.cellHeight, game.cellWidth, game.cellHeight);
	
	if (apple.transparency < 50) {
		apple.resetPosition();
		apple.transparency = 255;
	}
}

// shows the score
function drawScore(txt, snake, x) {
    fill(255);
    textSize(25);
    text(txt + " Score: " + snake.score, x, 35);
};

// checks if the game is over by hitting a wall or colliding with tail
function checkIfGameOver() {
    if (player.hitsWall() || game.gameOver) {
		player.stopMove = true;
		robot.stopMove = true;
        textSize(50);
        fill(255);
        text("Game Over!\nScore: " + player.score, game.theWidth / 3, game.theHeight / 3);
        
        textSize(20);
        text("Press r to replay", game.theWidth / 3, game.theHeight / 3 + 100);
        
        apple.transparency = 255;
    }
};


// checks if the player is on the apple and, if it is, the score increments
var checkIfSnakeEatsApple = function(snake) {
    var snakeHead = snake.cells[0];
    
    // adds duplicate tail
    
    if (snake.i+snakeHead[0] === apple.i && snake.j+snakeHead[1] === apple.j && apple.transparency >= 50) {
        snake.score++;
        snake.cells.push(Object.assign({}, snake.cells[snake.cells.length-1]));
        apple.resetPosition();
        apple.transparency = 255;
    }
};

// reset the game when game over
function resetGame() {
	game.gameOver = false;
	apple.resetPosition();
	player.i = Math.floor((Math.random()* game.rows-2) + 2);
	player.j = Math.floor((Math.random()* game.cols-2) + 2);
	player.score = 0;
	player.stopMove = false;
	player.resetCells();
	player.direction = 37;
	robot.i = Math.floor((Math.random()* game.rows-2) + 2);
	robot.j = Math.floor((Math.random()* game.cols-2) + 2);
	robot.score = 0;
	robot.stopMove = false;
	robot.direction = 37;
	robot.resetCells();
}



function draw() {
	background(0);
	
	drawGrid();
	drawSnake(player);
	drawSnake(robot);
	player.move();
	robot.move();
	makeRobotEatApple();
	drawApple();
	drawScore("Your", player, 20);
	drawScore("Robot's", robot, 1100);
	checkIfGameOver();
	checkIfSnakeEatsApple(player);
	checkIfSnakeEatsApple(robot);
}



var movementKeysAndInverses = new Map();
movementKeysAndInverses.set(37, 39);
movementKeysAndInverses.set(38, 40);
movementKeysAndInverses.set(39, 37);
movementKeysAndInverses.set(40, 38);

function keyPressed() {
	
	// if player clicks key of inverse direction of snake's current direction,
	if (movementKeysAndInverses.get(keyCode) == player.direction) {
		game.gameOver = true; // game over
	}
			
	switch (keyCode) {
		case 39: // Right arrow key
		case 37: // Left arrow key
		case 40: // Down arrow key
		case 38: // Up arrow key
			player.direction = keyCode;
			break;
			
		case 82:
			resetGame();
			break;
	}
}
