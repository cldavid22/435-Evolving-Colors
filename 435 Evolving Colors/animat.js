class Animat {
	constructor(other, automata) {
		this.automata = automata;
		this.hue = other.hue;
		this.x = other.x;
		this.y = other.y;
		this.energy = 50;
	}

	move() {
		let x = this.x;
		let y = this.y;
		let best = Infinity;
		const empty = [];

		for (let i = -1; i < 2; i++) {
			const newX = this.wrapAround(this.x + i, 100);
			for (let j = -1; j < 2; j++) {
				const newY = this.wrapAround(this.y + j, 100);
				const plant = this.automata.arr[newX][newY];

				if (!plant) {
					empty.push({x: newX, y: newY});
					if (Infinity < best) {
						best = Infinity;
						x = newX;
						y = newY;
					}
				} else {
					const diff = Math.abs(this.hue - plant.hue);
					if (diff < best) {
						best = diff;
						x = newX;
						y = newY;
					}
				}
			}
		}

		this.x = x;
		this.y = y;
	}

	reproduce() {
		if(this.energy > 80) {
			this.energy -= 80;

			gameEngine.addEntity(new Animat(this.mutate(),this.automata));
		}
	}

	die() {
		this.removeFromWorld = true;
	}

	mutate() {
    		const randomOffset = (offset) => Math.floor(Math.random() * offset) - 1;
    		const newX = this.wrapAround(this.x + randomOffset(3), 100);
    		const newY = this.wrapAround(this.y + randomOffset(3), 100);
    		const hue = this.wrapAround(this.hue + randomOffset(21), 360);
    		return { hue, x: newX, y: newY };
    	}

	update() {
		this.move();
		this.eat();
		this.reproduce();
		if (this.energy < 1 || Math.random() < 0.01) this.die();
	}

	hueDifference(plant) {
		let diff = plant ? Math.abs(this.hue - plant.hue) : 180;
		if (diff > 180) {
			diff = 360 - diff;
		}
		return (90 - diff) / 90;
	}

	eat() {
		const growthrate = parseInt(document.getElementById("animatgrowth").value) || 1;
		const selectivity = parseInt(document.getElementById("animatselection").value) || 0;
		const plant = this.automata.arr[this.x][this.y];
		const diff = this.hueDifference(plant);

		if (plant && diff >= selectivity) {
			this.automata.arr[this.x][this.y] = null;
			this.energy += (80 / growthrate) * diff;
		}
	}

	draw(ctx) {
		ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
		ctx.strokeStyle = "light gray";
		ctx.beginPath();
		ctx.arc((this.x + 0.5) * 10, (this.y + 0.5) * 10, 10 / 2 - 1, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}

	wrapAround(value, max) {
		if (value >= max) return value % max;
		if (value < 0) return max + (value % max);
		return value;
	}
}