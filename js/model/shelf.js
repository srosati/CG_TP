import {
	MeshBasicMaterial,
	Mesh,
	Object3D,
    BoxGeometry
} from '../../../build/three.module.js';

class Bar extends Mesh {
    constructor(color, width, height, x, y, z) {
		const geometry = new BoxGeometry(width, height, width);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);
		this.position.set(x, y, z);
	}
}

class Rack extends Mesh {
    constructor(color, width, height, depth, x, y, z) {
        const geometry = new BoxGeometry(width, height, depth);
        const material = new MeshBasicMaterial({ color: color });
        super(geometry, material);
        this.position.set(x, y, z);
    }
}

export default class Shelf extends Object3D {
    bars_qty = 9;
    racks_qty = 3;
    pieces_qty = 18;

    constructor({ color, width, height, depth, x, y, z }) {
        super();

        this.bars = [];
        this.racks = [];
        this.pieces = [];
        
        this.generateBars(height, width, depth, x, y, z);
        this.generateRacks(height, width, depth, x, y, z);
        this.position.set(x, y, z);
        this.rotateY(- Math.PI / 3);
    }

    show(parent) {
		parent.add(this);
        for (let i = 0; i < this.bars_qty * 2; i++) {
            this.add(this.bars[i]);
        }
        for (let i = 0; i < this.racks_qty * 2; i++) {
            this.add(this.racks[i]);
        }
        for (let i = 0; i < this.pieces_qty; i++) {
            this.add(this.pieces[i]);
        }

	}

    generateBars(height, width, depth, x, y, z) {
        for (let i = 0; i < this.bars_qty; i++) {
            this.bars.push(new Bar(0xc8da49, 0.5, height, x + i * width / 8, y + height / 2, z));
            this.bars.push(new Bar(0xc8da49, 0.5, height, x + i * width / 8, y + height / 2, z - depth));
        }
    }

    generateRacks(height, width, depth, x, y, z) {
        for (let i = 0; i < this.racks_qty; i++) {
            this.racks.push(new Rack(0xa7fff1, width + 2, 0.1, depth + 2, x + width / 2, y + i * height / 3 + height / 3 - 0.5, z - depth / 2));
        }
    }
}