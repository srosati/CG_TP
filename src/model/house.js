import { Object3D, Mesh, PlaneGeometry, MeshPhysicalMaterial } from 'three';

export default class House extends Object3D {
	constructor({ x = 0, y = 0, z = 0, width = 10, height = 10, depth = 10 }) {
		super();
		this.floor = new Mesh(
			new PlaneGeometry(width, depth, 10, 10),
			new MeshPhysicalMaterial({ color: 0x937e7d })
		);
		this.floor.position.y = 0;
		this.floor.rotateX(-Math.PI / 2);

		this.ceil = new Mesh(
			new PlaneGeometry(width, depth, 10, 10),
			new MeshPhysicalMaterial({ color: 0x937e7d })
		);
		this.ceil.position.y = height;
		this.ceil.rotateX(Math.PI / 2);

		this.leftWall = new Mesh(
			new PlaneGeometry(depth, height, 10, 10),
			new MeshPhysicalMaterial({ color: 0xeeeeee })
		);
		this.leftWall.position.z = -width / 2;
		this.leftWall.position.y = height / 2;

		this.rightWall = new Mesh(
			new PlaneGeometry(depth, height, 10, 10),
			new MeshPhysicalMaterial({ color: 0xeeeeee })
		);
		this.rightWall.position.z = width / 2;
		this.rightWall.position.y = height / 2;
		this.rightWall.rotateX(Math.PI);

		this.topWall = new Mesh(
			new PlaneGeometry(depth, height, 10, 10),
			new MeshPhysicalMaterial({ color: 0xeeeeee })
		);
		this.topWall.position.y = height / 2;
		this.topWall.position.x = width / 2;
		this.topWall.rotateY(-Math.PI / 2);

		this.bottomWall = new Mesh(
			new PlaneGeometry(depth, height, 10, 10),
			new MeshPhysicalMaterial({ color: 0xeeeeee })
		);
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
