// === CONFIGURAÇÃO INICIAL ===
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

// === OBJETO ROBO ===
let robo = {
  x: 50,          // posição inicial no eixo X
  y: H - 100,     // posição inicial no eixo Y
  w: 40,          // largura
  h: 60,          // altura
  baseWidth: 60,  // largura da base (tampa)
  speed: 4,       // velocidade de movimento
  color: "#1565c0" // azul escuro
};

// === TECLAS ===
let keys = {}; // objeto que vai guardar que teclas estão pressionadas

document.addEventListener("keydown", (e) => {
  keys[e.key] = true; // marca a tecla como pressionada
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false; // marca a tecla como solta
});

// === FUNÇÃO PARA ATUALIZAR O ROBO ===
function updateRobo() {
  // mover para a esquerda
  if (keys["ArrowLeft"] && robo.x > 0) {
    robo.x -= robo.speed;
  }

  // mover para a direita
  if (keys["ArrowRight"] && robo.x + robo.w < W) {
    robo.x += robo.speed;
  }
}

// === FUNÇÃO PARA DESENHAR O ROBO ===
function drawRobo() {
  // corpo
  ctx.fillStyle = robo.color;
  ctx.fillRect(robo.x, robo.y, robo.w, robo.h);

  // base (tampa) — desenhada um pouco acima da cabeça
  ctx.fillStyle = "#90caf9"; // azul mais claro
  ctx.fillRect(robo.x - 10, robo.y - 10, robo.baseWidth, 10);
}

// === FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO ===
function render() {
  // fundo
  ctx.fillStyle = "#b3e5fc";
  ctx.fillRect(0, 0, W, H);

  // chão
  ctx.fillStyle = "#81c784";
  ctx.fillRect(0, H - 40, W, 40);

  // caixote de lixo
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(W - 80, H - 100, 60, 60);

  // atualizar e desenhar o robô
  updateRobo();
  drawRobo();

  // loop da animação
  requestAnimationFrame(render);
}

// iniciar o jogo
render();
