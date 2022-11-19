import {
	Object3D,
	Mesh,
	PlaneGeometry,
	MeshPhysicalMaterial,
	TextureLoader,
	RepeatWrapping,
	MirroredRepeatWrapping
} from 'three';

import '../maps/StoneTilesFloor01_1K_BaseColor.png';
import '../maps/CorrugatedMetalPanel02_1K_BaseColor.png';
export default class House extends Object3D {
	constructor({ x = 0, y = 0, z = 0, width = 10, height = 10, depth = 10 }) {
		super();

		const floorTexture = new TextureLoader().load('maps/StoneTilesFloor01_1K_BaseColor.png');
		floorTexture.wrapS = floorTexture.wrapT = RepeatWrapping;
		floorTexture.repeat.set(7, 7);

		this.floor = new Mesh(new PlaneGeometry(width, depth, 10, 10), new MeshPhysicalMaterial({ map: floorTexture }));
		this.floor.position.y = 0;
		this.floor.rotateX(-Math.PI / 2);

		const wallTexture = new TextureLoader().load('maps/CorrugatedMetalPanel02_1K_BaseColor.png');
		wallTexture.wrapS = wallTexture.wrapT = MirroredRepeatWrapping;
		wallTexture.repeat.set(6, 1);

		const wallMaterial = new MeshPhysicalMaterial({ map: wallTexture });
		const wallGeometry = new PlaneGeometry(depth, height, 10, 10);

		this.ceil = new Mesh(new PlaneGeometry(width, depth, 10, 10), new MeshPhysicalMaterial({ color: 0x937e7d }));
		this.ceil.position.y = height;
		this.ceil.rotateX(Math.PI / 2);

		this.leftWall = new Mesh(wallGeometry, wallMaterial);
		this.leftWall.position.z = -width / 2;
		this.leftWall.position.y = height / 2;

		this.rightWall = new Mesh(wallGeometry, wallMaterial);
		this.rightWall.position.z = width / 2;
		this.rightWall.position.y = height / 2;
		this.rightWall.rotateX(Math.PI);

		this.topWall = new Mesh(wallGeometry, wallMaterial);
		this.topWall.position.y = height / 2;
		this.topWall.position.x = width / 2;
		this.topWall.rotateY(-Math.PI / 2);

		this.bottomWall = new Mesh(wallGeometry, wallMaterial);
		this.bottomWall.position.y = height / 2;
		this.bottomWall.position.x = -width / 2;
		this.bottomWall.rotateY(Math.PI / 2);
	}

	show(parent) {
		parent.add(this);
		parent.add(this.floor);
		parent.add(this.ceil);
		parent.add(this.leftWall);
		parent.add(this.rightWall);
		parent.add(this.topWall);
		parent.add(this.bottomWall);
	}
}
