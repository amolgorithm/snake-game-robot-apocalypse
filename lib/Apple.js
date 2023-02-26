class Apple {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.color = [255, 0, 0];
		this.transparency = 255;
	}
	
    resetPosition() {
        this.i = (round(random(2, game.rows-2)));
        this.j = (round(random(2, game.cols-2)));
    }
}
