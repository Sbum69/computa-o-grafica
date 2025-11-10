export const robo = {
	x: 50,
	y: 300,
	w: 40,
	h: 60,
	baseWidth: 58,
	speed: 6,
	frameTimer: 0,
	frameInterval: 200, // ms
	stepFrame: 0, // 0 ou 1
	moving: false,
	dir: "right",
};

let keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// --- sprites ---
const imgPaths = {
	head: "./sprites/head.png",
	torso: "./sprites/torso.png",
	armLeft: "./sprites/lArm.png",
	armRight: "./sprites/rArm.png",
	legLeft: "./sprites/lLeg.png",
	legRight: "./sprites/rLeg.png",
	tampa: "./sprites/lid.png",
};

export const roboSprites = {};

for (const [part, path] of Object.entries(imgPaths)) {
	const img = new Image();
	img.src = path;
	roboSprites[part] = img;
}

// --- movimento e animação ---
export function updateRobo(canvasWidth, deltaTime) {
	robo.moving = false;

	// movimento
	if (keys["ArrowLeft"]) {
		robo.x -= robo.speed;
		robo.dir = "left";
		robo.moving = true;
	}
	if (keys["ArrowRight"]) {
		robo.x += robo.speed;
		robo.dir = "right";
		robo.moving = true;
	}

	// não deixar robô fugir
	robo.x = Math.max(0, Math.min(robo.x, canvasWidth - 40));

	// atualizar pernas
	if (robo.moving) {
		robo.frameTimer += deltaTime;
		if (robo.frameTimer > robo.frameInterval) {
			robo.frameTimer = 0;
			robo.stepFrame = robo.stepFrame === 0 ? 1 : 0; // 0-1
		}
	} else {
		robo.stepFrame = 0;
		robo.frameTimer = 0;
	}
}

// --- draw ---
export function drawRobo(ctx) {
	const bX = robo.x-8;
	const bY = robo.y-7;
	const baseX = Math.round(bX);
	const baseY = Math.round(bY);

	// alternar pernas
	const legLift = 1;
	const leftLegOffset = robo.moving && robo.stepFrame === 0 ? -legLift : 0;
	const rightLegOffset = robo.moving && robo.stepFrame === 1 ? -legLift : 0;

	// braços
	const armOffset =
		robo.moving ?
			(robo.dir === "right" ? { right: 1, left: 0 } : { right: 0, left: 1 })
			: { right: 0, left: 0 };

	const s = roboSprites;

	if (!Object.values(s).every((img) => img.complete)) return;

	// pernas
	ctx.drawImage(s.legLeft, baseX, baseY + leftLegOffset);
	ctx.drawImage(s.legRight, baseX, baseY + rightLegOffset);

	// torso
	ctx.drawImage(s.torso, baseX, baseY);

	// braços
	ctx.drawImage(s.armLeft, baseX, baseY + armOffset.left);
	ctx.drawImage(s.armRight, baseX, baseY + armOffset.right);

	// head
	ctx.drawImage(s.head, baseX, baseY - leftLegOffset);

	// tampa (top lid)
	ctx.drawImage(s.tampa, baseX, baseY);
}
