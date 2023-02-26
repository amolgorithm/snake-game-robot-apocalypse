class Game {
	constructor() {
		this.theWidth = window.innerWidth-5;
		this.theHeight = window.innerHeight-15;
		this.rows = 31;
		this.cols = 15;
		this.cellWidth = this.theWidth/this.rows;
		this.cellHeight = this.theHeight/this.cols;
		this.gameOver = false;
	}

}
