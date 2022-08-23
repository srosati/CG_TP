import { Scene, PerspectiveCamera, WebGLRenderer } from '../../build/three.module.js';

import Car from './model/car.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera.rotateX(Math.PI / 3);
camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 3;

const car = new Car({
	color: 0x009900,
	x: 5,
	y: 0,
	z: 0,
	wheelColor: 0x000099,
	bodyLength: 1.5,
	bodyWidth: 0.8,
	bodyHeight: 0.5,
	wheelRadius: 0.18,
	wheelDepth: 0.1
});
car.show(scene);

function animate() {
	requestAnimationFrame(animate);
	car.update();

	renderer.render(scene, camera);
}

animate();

document.addEventListener('keydown', onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
	var keyCode = event.which;
	if (keyCode == 87) {
		car.moveForward();
	} else if (keyCode == 83) {
		car.moveBackward();
	} else if (keyCode == 65) {
		car.rotateLeft();
	} else if (keyCode == 68) {
		car.rotateRight();
	}
}
