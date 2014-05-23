function newConway(width, height, state) {
	this.state = state;
	this.width = width;
	this.height = height;

	// fill the state with falses
	function clear() {
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				state[x][y] = false;
			}
		}
	} // end clear

	// refill the state randomly
	function randomSeed() {
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
						this.state[x][y] = Math.random() < .5;; // increment if the cell is true
			}
		}
	} // end randomSeed

	// count all of the living cells
	function count() {
		var count = 0;
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				if (this.state[x][y]) {
						count++; // increment if the cell is true
					}
				}
			}
			return count;
	} // end count

	// transition to the next state
	// if a cell is alive, it stays alive if it has 2 or 3 neighbors
	// a dead cell comes to life with exactly 3 neighbors
	function next() {
		var next_state = new Array(this.width);
		for (var x = 0; x < width; x++) {
			state[x] = new Array(this.height);
		}

		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				next_state[x][y] = lives(x, y);
			}
		}
		this.state = next_state;
		return this.state;
	} // end next

	// see if the cell at x, y will live to the next generation
	function lives(x, y) {
		var neighbors = neighbors(x, y);
		if (this.state[x][y]) {
			return (neighbors > 1 && neighbors < 4);
		} else {
			return (neighbors == 3);
		}
	} // end lives

	// count a cell's living neighbors
	function neighbors(x, y) {
		var n = 0;
		if (x > 0 && x < width - 1 && y > 0 && y < height) {
			for (var i = -1; i <= 1; i++) {
				for (var p = -1; p <= 1; p++) {
					if (!(i == 0 && p == 0) && state[x + i][y + p]) n++;
				}
			}
		} else if (x == 0 && y == 0) {
			if (state[x][y + 1]) n++;
			if (state[x + 1][y]) n++;
			if (state[x + 1][y + 1]) n++;
		} else if (x == 0 && y == height - 1) {
			if (state[x][y - 1]) n++;
			if (state[x + 1][y - 1]) n++;
			if (state[x + 1][y]) n++;
		} else if (x == width - 1 && y == 0) {
			if (state[x - 1][y]) n++;
			if (state[x - 1][y + 1]) n++;
			if (state[x][y + 1]) n++;
		} else if (x == width - 1 && y == height - 1) {
			if (state[x][y - 1]) n++;
			if (state[x - 1][y]) n++;
			if (state[x - 1][y - 1]) n++;
		} else if (x == 0) {
			if (state[x][y + 1]) n++;
			if (state[x][y - 1]) n++;
			if (state[x + 1][y + 1]) n++;
			if (state[x + 1][y - 1]) n++;
			if (state[x + 1][y]) n++;
		} else if (x == width - 1) {
			if (state[x][y + 1]) n++;
			if (state[x][y - 1]) n++;
			if (state[x - 1][y + 1]) n++;
			if (state[x - 1][y - 1]) n++;
			if (state[x - 1][y]) n++;
		} else if (y == 0) {
			if (state[x + 1][y]) n++;
			if (state[x - 1][y]) n++;
			if (state[x + 1][y + 1]) n++;
			if (state[x - 1][y + 1]) n++;
			if (state[x][y + 1]) n++;
		} else if (y == height - 1) {
			if (state[x + 1][y]) n++;
			if (state[x - 1][y]) n++;
			if (state[x + 1][y - 1]) n++;
			if (state[x - 1][y - 1]) n++;
			if (state[x][y - 1]) n++;
		}
		return n;
	} // end neighbors

	function toString() {
		var out = "";
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				if (state[x][y]) {
					out = out + "+ ";
				} else {
					out = out + "  ";
				}
			}
			out = out + "\n";
		}
		return out;
	}
}