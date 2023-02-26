class Snake {
	constructor(i, j, bodyColor, headColor) {
		this.i = i;
		this.j = j;
		this.bodyColor = bodyColor;
		this.headColor = headColor;
		this.direction = 37;
		this.score = 0;
		this.cells = [];
		this.stopMove = false
		
		for (var k = 0; k < initialBlocks; k++) {
			this.cells.push([k, 0]);
		}
	}
    
    // method to check the the canMove principals
    canMove(direction) {
        var moveBool = false;
        
        switch (direction) {
            case 39:
                moveBool = (this.cells[0][1] !== this.cells[1][1]) || (this.cells[1][0] < this.cells[0][0]);
                break;
                
            case 37:
                moveBool = (this.cells[0][1] !== this.cells[1][1]) || (this.cells[1][0] > this.cells[0][0]);
                break;
                
            case 40:
                moveBool = (this.cells[0][0] !== this.cells[1][0]) || (this.cells[1][1] < this.cells[0][1]);
                break;
                
            case 38:
                moveBool = (this.cells[0][0] !== this.cells[1][0]) || (this.cells[1][1] > this.cells[0][1]);
                break;
        }
        
        return moveBool;
        
    };
    
    
    // method to move the snake in its own direction
    move() {
        if (!this.canMove(this.direction)) {
            return;
        }
        
        if (!this.stopMove) {
			switch (this.direction) {
				
				case 39:
					this.cells.unshift([this.cells[0][0]+1, this.cells[0][1]]);
					break;
					
				case 37:
					this.cells.unshift([this.cells[0][0]-1, this.cells[0][1]]);
					break;
					
				case 40:
					this.cells.unshift([this.cells[0][0], this.cells[0][1]+1]);
					break;
					
				case 38:
					this.cells.unshift([this.cells[0][0], this.cells[0][1]-1]);
					break;
				
			}
			this.cells.pop();
		}
    };
    
    hitsWall() {

        return (this.cells[0][0]+this.i >= game.rows || this.cells[0][0]+this.i < 0 ||
            this.cells[0][1]+this.j >= game.cols || this.cells[0][1]+this.j < 0
        );
    }
    
    resetCells() {
		this.cells = [];
		
		for (var k = 0; k < initialBlocks; k++) {
			this.cells.push([k, 0]);
		}
	}

}
