class Automata {
	constructor() {
		this.arr = [];
		this.length = 100;
		this.width = 100;
		this.initializeArr();
	}

	initializeArr() {
		this.arr = Array.from({ length: this.width }, () =>
			Array.from({ length: this.length }, () => null)
		);
	}

	clearPlants() {
		this.arr.forEach(row => row.fill(null));
	}

	addPlant() {
		const i = this.getRandomIndex(this.width);
		const j = this.getRandomIndex(this.length);
		const color = this.getRandomColor();
		this.arr[i][j] = new Plant({ hue: color, x: i, y: j }, this);
	}

	update() {
		this.arr.forEach(row => {
			row.forEach(cell => {
				if (cell) {
					cell.update();
					if (Math.random() < 0.001) {
						cell = null;
					}
				}
			});
		});
	}

	draw(ctx) {
		this.arr.forEach(row => {
			row.forEach(cell => {
				if (cell) {
					cell.draw(ctx);
				}
			});
		});
	}

	getRandomIndex(max) {
		return Math.floor(Math.random() * max);
	}

	getRandomColor() {
		return Math.floor(Math.random() * 360);
	}
}