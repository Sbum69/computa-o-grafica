import { ObjetoChuva } from "./ObjetoChuva.js";

export class Pilha extends ObjetoChuva {
	constructor(x) {
		super(x, 1.2, 0.25, "#6eff6eff");
	}
}

export class Papel extends ObjetoChuva {
	constructor(x) {
		super(x, 0.66, 0.8, "#ffee58"); // faster, lighter
		this.angle = Math.random() * Math.PI * 2;
		this.amplitude = 30 + Math.random() * 20; // how far it swings
		this.freq = 0.05 + Math.random() * 0.03;  // how fast it oscillates
		this.startX = x;
	}

	fall() {
		this.y += this.speed;
		this.angle += this.freq;
		this.x = this.startX + Math.sin(this.angle) * this.amplitude;
	}
}

export class Bola extends ObjetoChuva {
	constructor(x) {
		super(x, 1, 1, "#969696");
	}
}

export class Saco extends ObjetoChuva {
	constructor(x) {
		super(x, 0.5, 2.5, "#0d0030ff");
	}
}