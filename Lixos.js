import { ObjetoChuva } from "./ObjetoChuva.js";


export class Pilha extends ObjetoChuva {
	constructor(x, roboBaseWidth) {
		super(x, 1.2, 0.25, "#6eff6eff", "./lixos/pilha.png");
	}
}

export class Papel extends ObjetoChuva {
	constructor(x) {
		super(x, 0.66, 0.8, "#ffee58", "./lixos/papel.png");
		this.angle = Math.random() * Math.PI * 2;
		this.amplitude = 30 + Math.random() * 20;
		this.freq = 0.05 + Math.random() * 0.03;
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
		super(x, 1, 1, "#969696", "./lixos/bola.png");
	}
}

export class Saco extends ObjetoChuva {
	constructor(x) {
		super(x, 0.5, 2.5, "#0d0030ff", "./lixos/saco.png");
	}
}