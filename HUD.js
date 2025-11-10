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
		this.mostrarMensagem("Bom trabalho! + " + valor + " Pontos");
	},

	perderVida() {
		if (this.vidas > 0) {
			this.vidas--;
			this.mostrarMensagem("Lixo Perdido!");
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

		if (this.jogoTerminado) {
			// Ecrã de Fim de Jogo
			ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			ctx.fillStyle = "white";
			ctx.font = "48px LcdSolid";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";

			const line1 = "FIM DE JOGO!";
			const line1Width = Math.round(ctx.measureText(line1).width);
			const line1X = Math.round((ctx.canvas.width - line1Width) / 2);
			const line1Y = Math.round(ctx.canvas.height / 2) - 60;
			ctx.fillText(line1, line1X, line1Y);

			const line2 = `Pontuação Final: ${this.pontos}`;
			const line2Width = Math.round(ctx.measureText(line2).width);
			const line2X = Math.round((ctx.canvas.width - line2Width) / 2);
			const line2Y = line1Y + 60;
			ctx.fillText(line2, line2X, line2Y);
		} else {
			// Pontos
			ctx.fillStyle = "#1b5e20";
			ctx.font = "48px LcdSolid"; // size + font-family
			ctx.textAlign = "left";
			ctx.fillText(`Pontos: ${this.pontos}`, 20, 30);

			// Vidas
			ctx.fillStyle = this.vidas <= 1 ? "#ff0000" : "#1b5e20";
			ctx.fillText(`Vidas: ${this.vidas}`, 20, 60);

			// Mensagem temporária
			if (this.mostrarMsg) {
				ctx.fillStyle = "#2e7d32";
				ctx.font = "48px LcdSolid";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";

				const textWidth = Math.round(ctx.measureText(this.mensagem).width);

				const x = Math.round((ctx.canvas.width - textWidth) / 2);
				const y = 100;

				ctx.fillText(this.mensagem, x, y);
			}
		}

		ctx.restore();
	}
};