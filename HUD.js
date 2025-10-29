let HUD = {
  pontos: 0,
  vidas: 5,       // NOVO: Começa com 5 vidas
  mensagem: "",
  mostrarMsg: false,
  jogoTerminado: false, // NOVO: Estado para saber se o jogo terminou

  // O método atualizar agora verifica o Game Over
  atualizar(deltaTime) {
    if (this.vidas <= 0 && !this.jogoTerminado) {
        this.jogoTerminado = true;
        this.mostrarMensagem("FIM DE JOGO!");
    }
  },

  // Aumenta os pontos
  adicionarPontos(valor) {
    this.pontos += valor;
    this.mostrarMensagem("Bom trabalho! + " + valor + " Pontos! ♻️");
  },

  // NOVO: Diminui uma vida
  perderVida() {
      if (this.vidas > 0) {
          this.vidas--;
          this.mostrarMensagem("Lixo Perdido! ❌");
      }
  },

  // NOVO: Reset para quando o jogo recomeçar
  reset() {
      this.pontos = 0;
      this.vidas = 5;
      this.mensagem = "";
      this.mostrarMsg = false;
      this.jogoTerminado = false;
  },

  // Mostra uma mensagem por 2 segundos
  mostrarMensagem(texto) {
    this.mensagem = texto;
    this.mostrarMsg = true;
    setTimeout(() => {
      this.mostrarMsg = false;
    }, 2000);
  },

  // Desenha o HUD no Canvas
  desenhar(ctx) {
    ctx.save();

    // Texto principal
    ctx.fillStyle = "#1b5e20"; // verde escuro
    ctx.font = "18px Arial";
    ctx.fillText("Pontos: " + this.pontos, 20, 25);
    
    // ATUALIZAÇÃO: Desenha as Vidas
    ctx.fillStyle = this.vidas <= 1 ? "#ff0000" : "#1b5e20"; // Cor do coração fica vermelha se tiver 1 vida
    ctx.fillText("Vidas: " + this.vidas + " ❤️", 20, 50);

    // Mensagem temporária
    if (this.mostrarMsg) {
      ctx.fillStyle = "#2e7d32";
      ctx.font = "24px Arial";
      ctx.fillText(this.mensagem, 200, 50);
    }
    
    // NOVO: Mensagem de Game Over (e ecrã escuro)
    if (this.jogoTerminado) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("FIM DE JOGO!", ctx.canvas.width / 2, ctx.canvas.height / 2 - 20);
        ctx.font = "24px Arial";
        ctx.fillText("Pontuação Final: " + this.pontos, ctx.canvas.width / 2, ctx.canvas.height / 2 + 30);
    }

    ctx.restore();
  }
};