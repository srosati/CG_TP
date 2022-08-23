import { Scene, PerspectiveCamera, WebGLRenderer } from '../../build/three.module.js';

import Car from './model/car.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera.rotateX(Math.PI / 3);
camera.position.z = 50;
camera.position.y = 10;
camera.position.x = 30;

const car = new Car({
	color: 0x009900,
	x: 5,
	y: 0,
	z: 0,
	wheelColor: 0x000099,
	bodyLength: 12,
	bodyWidth: 8,
	bodyHeight: 5,
	wheelRadius: 2,
	wheelDepth: 1
});
car.show(scene);

function animate() {
	requestAnimationFrame(animate);
	car.update();

	renderer.render(scene, camera);
}

animate();

const KEY_CODES = {
	W: 87,
	S: 83,
	A: 65,
	D: 68,
	Q: 81,
	E: 69,
	G: 71
};

document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
	switch (event.which) {
		case KEY_CODES.W:
			car.moveForward();
			break;
		case KEY_CODES.S:
			car.moveBackward();
			break;
		case KEY_CODES.A:
			car.rotateLeft();
			break;
		case KEY_CODES.D:
			car.rotateRight();
			break;
		case KEY_CODES.Q:
			car.liftUp();
			break;
		case KEY_CODES.E:
			car.liftDown();
			break;
	}
}
