// Definição do robô
export const robo = {
	x: 50,
	y: 300,
	w: 40,
	h: 60,
	baseWidth: 60,
	speed: 6,
	color: "#1565c0"
};

let keys = {};

document.addEventListener("keydown", (e) => {
	keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
	keys[e.key] = false;
});

export function updateRobo(canvasWidth) {
	if (keys["ArrowLeft"]) robo.x -= robo.speed;
	if (keys["ArrowRight"]) robo.x += robo.speed;

	robo.x = Math.min(Math.max(robo.x, 0), canvasWidth - robo.w);
}

export function drawRobo(ctx) {
	// corpo
	ctx.fillStyle = robo.color;
	ctx.fillRect(robo.x, robo.y, robo.w, robo.h);

	// tampa
	ctx.fillStyle = "#90caf9";
	ctx.fillRect(robo.x - 10, robo.y - 10, robo.baseWidth, 10);
}