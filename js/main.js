import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, GridHelper, DirectionalLight, AmbientLight } from '../../build/three.module.js';
import { OrbitControls } from './libs/OrbitControls.js';
import { GUI } from './libs/dat.gui.module.js';

import Car from './model/car.js';
import Shelf from './model/shelf.js';
import Printer from './model/printer.js';
import B1 from './model/pieces/extrusion/b1.js';
import B2 from './model/pieces/extrusion/b2.js';
import B3 from './model/pieces/extrusion/b3.js';
import B4 from './model/pieces/extrusion/b4.js';
import A1 from './model/pieces/revolution/a1.js';
import A2 from './model/pieces/revolution/a2.js';
import A3 from './model/pieces/revolution/a3.js';
import A4 from './model/pieces/revolution/a4.js';
import House from './model/house.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new DirectionalLight(0x404040, 2);
scene.add(light);

const ambientLight = new AmbientLight(0x404040, 3);
scene.add(ambientLight);

/**
 * GUI
 */
const gui = new GUI();
const options = {
	Forma: 0,
	Altura: 10,
	AnguloDeTorsion: 0,
	Imprimir: () => {
		printer.print(selectedPiece, pieceOptions);
	}
};

let selectedPiece = A1;
let pieceOptions = {
	twist: 0,
	height: 10
};

const POSSIBLE_PIECES = [A1, A2, A3, A4, B1, B2, B3, B4];
gui.add(options, 'AnguloDeTorsion', 0, 360, 10).onChange((val) => {
	pieceOptions.twist = (val * Math.PI) / 180;
});

gui.add(options, 'Altura', 1, 10, 1).onChange((val) => {
	pieceOptions.height = val;
});

gui.add(options, 'Forma', { A1: 0, A2: 1, A3: 2, A4: 3, B1: 4, B2: 5, B3: 6, B4: 7 }).onChange((val) => {
	selectedPiece = POSSIBLE_PIECES[val];
});

gui.add(options, 'Imprimir');

camera.position.z = 50;
camera.position.y = 20;
camera.position.x = 10;

let orbital = true;
let fp = false;
let controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.target.set(scene.position.x, scene.position.y, scene.position.z);
let relativeCameraOffset = new Vector3(0, 15, -25);

const house = new House({
	x: 0,
	y: 0,
	z: 0,
	width: 200,
	height: 50,
	depth: 200
});
house.show(scene);

var gridHelper = new GridHelper(200, 20, 0x000000, 0x000000);
scene.add(gridHelper);

const car = new Car({
	color: 0x009900,
	x: 0,
	y: 4,
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
	width: 60,
	height: 34,
	depth: 5,
	x: 20,
	y: 0,
	z: -30
});
shelf.show(scene);

const printer = new Printer({ color: 0x009900, x: -40, y: 3, z: 0, width: 12, height: 6, depth: 10 });
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
		camera.lookAt(car.position.x, car.position.y + fp ? 10 : 0, car.position.z);
	}
	renderer.render(scene, camera);
}

requestAnimationFrame(animate);

const KEY_CODES = {
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
	six: 54
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
		case KEY_CODES.G:
			const grabbed = car.grabPiece(printer);
			if (!grabbed && car.piece) {
				const dropped = shelf.addPiece(car.piece);
				if (dropped) {
					car.dropPiece();
				}
			}
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
			controls.target.set(
				shelf.position.x + (shelf.depth / 2) * Math.sin(shelf._rotation),
				shelf.position.y,
				shelf.position.z + shelf.width * Math.cos(-Math.PI / 3)
			);
			break;
		case KEY_CODES.four:
			orbital = false;
			fp = true;
			relativeCameraOffset = new Vector3(0, 6, -2);
			break;
		case KEY_CODES.five:
			orbital = false;
			fp = false;
			relativeCameraOffset = new Vector3(0, 15, -25);
			break;
		case KEY_CODES.six:
			orbital = false;
			fp = false;
			relativeCameraOffset = new Vector3(25, 15, 0);
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
