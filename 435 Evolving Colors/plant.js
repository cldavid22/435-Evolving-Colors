class Plant {
    constructor(other, automata) {
        this.automata = automata;
        this.hue = other.hue;
        this.x = other.x;
        this.y = other.y;

        this.growth = 0;
    }

    mutate() {
        let newX = this.x - 1 + this.getRandomInt(3);
        newX = this.wrapAround(newX, 100);

        let newY = this.y - 1 + this.getRandomInt(3);
        newY = this.wrapAround(newY, 100);

        let hue = this.hue - 10 + this.getRandomInt(21);
        hue = this.wrapAround(hue, 360);

        return { hue, x: newX, y: newY };
    }

    update() {
        const growthrate = parseInt(document.getElementById("plantgrowth").value) || 0;

        if (this.growth < 80) this.growth += growthrate;

        if (this.growth >= 80) {
            const other = this.mutate();

            if (!this.automata.arr[other.x][other.y]) {
                this.automata.arr[other.x][other.y] = new Plant(other, this.automata);
                this.growth -= 80;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue},70%,60%)`;
        ctx.fillRect(this.x * 10, this.y * 10, 10, 10);
        ctx.strokeRect(this.x * 10, this.y * 10, 10, 10);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    wrapAround(value, max) {
        if (value >= max) return value % max;
        if (value < 0) return max + (value % max);
        return value;
    }
};