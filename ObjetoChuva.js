class ObjetoChuva {
	constructor(x, speed, weight, color) {
		this.x = x;
		this.y = -20; // aparecer fora da tela
		this.w = 20;
		this.h = 20;
		this.speed = speed;
		this.weight = weight;
		this.color = color;

		this.onRobot = false;
		this.jumpingToBin = false;
		this.jumpProgress = 0;
	}

	update(robo, binX, binY) {
		if (this.jumpingToBin) {
			// saltito
			this.jumpProgress += 0.05;
			this.x = this.x + (binX - this.x) * 0.1;
			this.y = this.y + (binY - this.y) * 0.1 - Math.sin(this.jumpProgress * Math.PI) * 5;

			if (this.jumpProgress >= 1) {
				this.collected = true; // remover
			}
			return;
		}

		if (!this.onRobot) {
			this.y += this.speed; // falling motion

			// Collision with robot top
			if (
				this.y + this.h >= robo.y - 10 && // em cima da tampa ou mais baixo
				this.y <= robo.y + robo.h && // acima do robo
				this.x + this.w > robo.x - 10 && // robo esta por baixo do lixo
				this.x < robo.x - 10 + robo.baseWidth
			) {
				this.onRobot = true;
				this.y = robo.y - 10 - this.h; // ficar em cima
			}
		} else {
			//movimento relativo da chuva
			this.x = robo.x + (this.relativeX ?? (this.x - robo.x));
			this.relativeX = this.x - robo.x;
			this.y = robo.y - 10 - this.h;
		}
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}
