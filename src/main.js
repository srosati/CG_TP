import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, AmbientLight, CubeTextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

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

import './maps/greyRoom1_right.jpg';
import './maps/greyRoom1_left.jpg';
import './maps/greyRoom1_top.jpg';
import './maps/greyRoom1_bottom.jpg';
import './maps/greyRoom1_front.jpg';
import './maps/greyRoom1_back.jpg';

/**
 * Creates a new scene, camera and renderer.
 */
const scene = new Scene();
const reflectionCube = new CubeTextureLoader()
.setPath('./maps/')
.load(['greyRoom1_right.jpg', 
	'greyRoom1_left.jpg',
	'greyRoom1_top.jpg',
	'greyRoom1_bottom.jpg',
	'greyRoom1_front.jpg',
	'greyRoom1_back.jpg']);
scene.background = reflectionCube;
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.localClippingEnabled = true;

document.body.appendChild(renderer.domElement);

/**
 * Lights
 */
// const light = new DirectionalLight(0x404040, 2);
// scene.add(light);

const ambientLight = new AmbientLight(0x404040, 0.5);
scene.add(ambientLight);


/**
 * GUI Configuration
 */
const SUPERFICIES = {
	Revolucion: 0,
	Barrido: 1
};
const FORMAS_REVOLUCION = {
	A1: 0,
	A2: 1,
	A3: 2,
	A4: 3
};
const FORMAS_BARRIDO = {
	B1: 0,
	B2: 1,
	B3: 2,
	B4: 3
};
const TEXTURE = [
	{path: 'maps/Marble03_1K_BaseColor.png', repeat: [2, 0.1]},
	{path: 'maps/Marble09_1K_BaseColor.png', repeat: [3, 0.3]},
	{path: 'maps/patron3.png', repeat: [16, 0.3]},
	{path: 'maps/Pattern02_1K_VarA.png', repeat: [16, 1]},
	{path: 'maps/Pattern05_1K_VarA.png', repeat: [16, 1]}
]

const gui = new GUI();
const options = {
	Textura: 0,
	Superficie: SUPERFICIES.Revolucion,
	FormaRevolucion: FORMAS_REVOLUCION.A1,
	FormaBarrido: FORMAS_BARRIDO.B1,
	Altura: 10,
	AnguloDeTorsion: 0,
	Imprimir: () => {
		selectedPiece =
			POSSIBLE_PIECES[superficie][superficie == SUPERFICIES.Revolucion ? formaRevolucion : formaBarrido];
		
		pieceOptions.repeat = pieceOptions.texture.repeat[superficie];
		printer.print(selectedPiece, pieceOptions);
	}
};

let selectedPiece = A1;
let superficie = SUPERFICIES.Revolucion;
let formaRevolucion = FORMAS_REVOLUCION.A1;
let formaBarrido = FORMAS_BARRIDO.B1;
let pieceOptions = {
	twist: 0,
	height: 10,
	texture: TEXTURE[0]
};

const POSSIBLE_PIECES = [
	[A1, A2, A3, A4],
	[B1, B2, B3, B4]
];


gui.add(options, 'AnguloDeTorsion', 0, 360, 10).onChange((val) => {
	pieceOptions.twist = (val * Math.PI) / 180;
});

gui.add(options, 'Altura', 1, 10, 1).onChange((val) => {
	pieceOptions.height = val;
});

gui.add(options, 'Textura', {T1: 0, T2: 1, T3: 2, T4: 3, T5: 4}).onChange((val) => {
	pieceOptions.texture = TEXTURE[val];
});

gui.add(options, 'Superficie', { Revolucion: 0, Barrido: 1 }).onChange((val) => {
	superficie = val;
});

gui.add(options, 'FormaRevolucion', { A1: 0, A2: 1, A3: 2, A4: 3 }).onChange((val) => {
	formaRevolucion = val;
});

gui.add(options, 'FormaBarrido', { B1: 0, B2: 1, B3: 2, B4: 3 }).onChange((val) => {
	formaBarrido = val;
});

gui.add(options, 'Imprimir');

/**
 * Initial Camera Position
 */
camera.position.z = 50;
camera.position.y = 20;
camera.position.x = 10;

/**
 * Camera Controls
 */
let orbital = true;
let fp = false;
let controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.target.set(scene.position.x, scene.position.y, scene.position.z);
let relativeCameraOffset = new Vector3(0, 15, -25);
// zoom in/out with o/p keys

/**
 * Galpon (traducir a ingles)
 */
const house = new House({
	x: 0,
	y: 0,
	z: 0,
	width: 200,
	height: 50,
	depth: 200
});
house.show(scene);

/**
 * Car
 */
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

/**
 * Shelf
 */
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

/**
 * Printer
 */
const printer = new Printer({
	color: 0xbcd3d6,
	x: -40,
	y: 3,
	z: 0,
	width: 12,
	height: 6,
	depth: 10,
	reflectionCube: reflectionCube
});
printer.show(scene);

let lastTime;

function animate(currentTime) {
	requestAnimationFrame(animate);

	if (!lastTime) lastTime = 0;
	let dt = currentTime - lastTime;
	lastTime = currentTime;

	car.update(dt);
	printer.update(dt);

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
	O: 79,
	P: 80,
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
		/**
		 * Move car
		 */
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
		/**
		 * Lift control
		 */
		case KEY_CODES.Q:
			car.liftUp();
			break;
		case KEY_CODES.E:
			car.liftDown();
			break;
		/**
		 * Grab/Drop piece
		 */
		case KEY_CODES.G:
			const grabbed = car.grabPiece(printer);
			if (!grabbed && car.piece) {
				const dropped = shelf.addPiece(car.piece);
				if (dropped) {
					car.dropPiece();
				}
			}
			break;
		/**
		 * Zoom in/out
		 */
		case KEY_CODES.O:
			console.log('O');
			controls.zoomOut();
			break;
		case KEY_CODES.P:
			controls.zoomIn();
			break;
		/**
		 * Cameras
		 */
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
				shelf.position.x + shelf.width / 2,
				shelf.position.y + shelf.height / 2,
				shelf.position.z + shelf.depth / 2
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
