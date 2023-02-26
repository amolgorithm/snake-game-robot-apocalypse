class Grid {
	constructor() {
		this.cells = [];
		
		for (var i = 0; i < game.rows; i++) {
			this.cells[i] = [];
			
			for (var j = 0; j < game.cols; j++) {
				this.cells[i].push(new Cell(i*game.cellWidth, j*game.cellHeight));
			}
		}
	}
}
