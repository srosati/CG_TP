import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from '../../build/three.module.js';
import { OrbitControls } from '../../examples/jsm/controls/OrbitControls.js';

import Car from './model/car.js';
import Shelf from './model/shelf.js';
import Printer from './model/printer.js';
import B1 from './model/pieces/extrusion/b1.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;
camera.position.y = 20;
camera.position.x = 10;

let orbital = true;
let fp = false;
let controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.target.set(scene.position.x, scene.position.y, scene.position.z);
let relativeCameraOffset = new Vector3(0,15,-25);

const car = new Car({
	color: 0x009900,
	x: 0,
	y: 0,
	z: 0,
	wheelColor: 0x000099,
	bodyLength: 12,
	bodyWidth: 8,
	bodyHeight: 4,
	wheelRadius: 2,
	wheelDepth: 1
});
car.show(scene);

const shelf = new Shelf({
	color: 0x009900,
	width: 40,
	height: 20,
	depth: 5,
	x: 0,
	y: 0,
	z: 10
});
shelf.show(scene);

const printer = new Printer({ color: 0x009900, x: -40, y: 0, z: 0, width: 12, height: 6, depth: 10 });
printer.show(scene);

let lastTime;

function animate(currentTime) {
	requestAnimationFrame(animate);

	if (!lastTime) lastTime = 0;
	let dt = currentTime - lastTime;
	lastTime = currentTime;

	car.update(dt);
	printer.update();
	
	if (orbital) {
		controls.update();
	} else {
		let auxCameraOffset = new Vector3(relativeCameraOffset.x, relativeCameraOffset.y, relativeCameraOffset.z);
	 	let cameraOffset = auxCameraOffset.applyMatrix4(car.matrixWorld);

	 	camera.position.x = cameraOffset.x;
	 	camera.position.y = cameraOffset.y;
	 	camera.position.z = cameraOffset.z;
	 	camera.lookAt(car.position.x, car.position.y, car.position.z);
	}
	renderer.render(scene, camera);
}

requestAnimationFrame(animate);

const KEY_CODES = {
	SPACE: 32,
	W: 87,
	S: 83,
	A: 65,
	D: 68,
	Q: 81,
	E: 69,
	G: 71,
	one: 49,
	two: 50,
	three: 51,
	four: 52,
	five: 53,
	six: 54,
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
		case KEY_CODES.SPACE:
			printer.print(B1); // TODO: GUI
			break;
		case KEY_CODES.one: 
			orbital = true;
			controls.target.set(scene.position.x, scene.position.y, scene.position.z);
			break;
		case KEY_CODES.two:
			orbital = true;
			controls.target.set(printer.position.x, printer.position.y, printer.position.z);
			break;
		case KEY_CODES.three:
			orbital = true;
			controls.target.set(shelf.position.x + shelf.depth / 2 * Math.sin(shelf._rotation), shelf.position.y, shelf.position.z + shelf.width * Math.cos(-Math.PI / 3));
			break;
		case KEY_CODES.four:
			orbital = false;
			fp = true;
			relativeCameraOffset = new Vector3(0,15,-25);
			// camera.position.set(car.position.x, car.position.y, car.position.z);
			break;
		case KEY_CODES.five:
			orbital = false;
			fp = false;
			relativeCameraOffset = new Vector3(0,15,-25);
			break;
		case KEY_CODES.six:
			orbital = false;
			fp = false;
			relativeCameraOffset = new Vector3(25,15,0);
			break;

	}
}

document.addEventListener('keyup', onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
	switch (event.which) {
		case KEY_CODES.W:
		case KEY_CODES.S:
			car.stopMove();
			break;
		case KEY_CODES.A:
		case KEY_CODES.D:
			car.stopRotate();
			break;
		case KEY_CODES.Q:
		case KEY_CODES.E:
			car.stopLift();
			break;
	}
}
