export class ObjetoChuva {
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
			this.x += (binX - this.x) * 0.1;
			this.y += (binY - this.y) * 0.1 - Math.sin(this.jumpProgress * Math.PI) * 5;

			if (this.jumpProgress >= 1) this.collected = true;
			return;
		}

		if (!this.onRobot) {
			this.fall(); //para diferentes quedas
			this.collideRobot(robo);
		} else {
			this.followRobot(robo);
		}
	}

	fall() {
		this.y += this.speed; // normalmente diretamente para baixo
	}

	collideRobot(robo) {
		if (
			this.y + this.h >= robo.y - 10 && // em cima da tampa ou mais baixo
			this.y <= robo.y + robo.h && // acima do robo
			this.x + this.w > robo.x - 10 && // robo esta por baixo do lixo
			this.x < robo.x - 10 + robo.baseWidth
		) {
			this.onRobot = true;
			this.y = robo.y - 10 - this.h; // ficar em cima
			this.relativeX = this.x - robo.x;
		}
	}

	followRobot(robo) {
		this.x = robo.x + this.relativeX;
		this.y = robo.y - 10 - this.h;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}
