import { Object3D, BoxGeometry, MeshBasicMaterial, Mesh } from '../../../build/three.module.js';

class Bar extends Mesh {
	constructor(color, width, height, x, y, z) {
		const geometry = new BoxGeometry(width, height, width);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);
		this.position.set(x, y, z);
	}
}

class Platform extends Mesh {
	constructor(color, width, height, x, y, z) {
		const geometry = new BoxGeometry(width, height, width);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);

		this.movementSpeed = height / 200;
		this.speed = 0;
		this.position.set(x, y, z);
	}

	update(dt) {
		this.translateY(this.speed * dt);
	}

	move(speed) {
		this.speed = speed;
	}

	moveUp() {
		this.move(this.movementSpeed);
	}

	moveDown() {
		this.move(-this.movementSpeed);
	}

	stop() {
		this.speed = 0;
	}
}

export default class Lift extends Object3D {
	constructor({ height, barColor, barSeparation, barWidth, platformColor, platformWidth, x = 0, y = 0, z = 0 }) {
		super();

		this.bar_l = new Bar(barColor, barWidth, height, -barSeparation / 2, height / 2, barWidth / 2);
		this.bar_r = new Bar(barColor, barWidth, height, barSeparation / 2, height / 2, barWidth / 2);
		this.platform = new Platform(platformColor, platformWidth, height / 20, 0, height / 2, platformWidth / 2);
		this.position.set(x, y, z);
	}

	show(parent) {
		parent.add(this);
		this.add(this.bar_l);
		this.add(this.bar_r);
		this.add(this.platform);
	}

	update(dt) {
		this.platform.update(dt);
	}

	moveUp() {
		this.platform.moveUp();
	}

	moveDown() {
		this.platform.moveDown();
	}

	stop() {
		this.platform.stop();
	}
}
