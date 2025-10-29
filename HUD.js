// hud.js
export const HUD = {
	pontos: 0,
	vidas: 5,
	mensagem: "",
	mostrarMsg: false,
	jogoTerminado: false,

	atualizar(deltaTime) {
		if (this.vidas <= 0 && !this.jogoTerminado) {
			this.jogoTerminado = true;
			this.mostrarMensagem("FIM DE JOGO!");
		}
	},

	adicionarPontos(valor) {
		this.pontos += valor;
		this.mostrarMensagem("Bom trabalho! + " + valor + " Pontos! ♻️");
	},

	perderVida() {
		if (this.vidas > 0) {
			this.vidas--;
			this.mostrarMensagem("Lixo Perdido! ❌");
		}
	},

	reset() {
		this.pontos = 0;
		this.vidas = 5;
		this.mensagem = "";
		this.mostrarMsg = false;
		this.jogoTerminado = false;
	},

	mostrarMensagem(texto) {
		this.mensagem = texto;
		this.mostrarMsg = true;
		clearTimeout(this._msgTimeout);
		this._msgTimeout = setTimeout(() => {
			this.mostrarMsg = false;
		}, 2000);
	},

	desenhar(ctx) {
		ctx.save();

		// Pontos
		ctx.fillStyle = "#1b5e20";
		ctx.font = "18px Arial";
		ctx.textAlign = "left";
		ctx.fillText(`Pontos: ${this.pontos}`, 20, 25);

		// Vidas
		ctx.fillStyle = this.vidas <= 1 ? "#ff0000" : "#1b5e20";
		ctx.fillText(`Vidas: ${this.vidas} ❤️`, 20, 50);

		// Mensagem temporária
		if (this.mostrarMsg) {
			ctx.fillStyle = "#2e7d32";
			ctx.font = "24px Arial";
			ctx.textAlign = "center";
			ctx.fillText(this.mensagem, ctx.canvas.width / 2, 50);
		}

		// Ecrã de Fim de Jogo
		if (this.jogoTerminado) {
			ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			ctx.fillStyle = "white";
			ctx.font = "40px Arial";
			ctx.textAlign = "center";
			ctx.fillText("FIM DE JOGO!", ctx.canvas.width / 2, ctx.canvas.height / 2 - 20);

			ctx.font = "24px Arial";
			ctx.fillText(`Pontuação Final: ${this.pontos}`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 30);
		}

		ctx.restore();
	}
};