import { EventEmitter } from '@angular/core';
import * as THREE from 'three';
import { Material, Mesh, MeshStandardMaterial } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export class TextThree extends THREE.Group {
  material: Material = new THREE.MeshBasicMaterial( {
    color: 0x000000,
    side: THREE.DoubleSide
  } );
  mesh!: Mesh;
  geometry!: TextGeometry;

  _text: string = "";
  set text(value: string) {
    this._text = value;
    this.setText(this.text);
  }
  get text(): string {
    return this._text;
  }
  textChanged: EventEmitter<Mesh> = new EventEmitter<Mesh>();

  constructor(material?: Material) {
    super();
    if (material) this.material = material;

    this.mesh = new Mesh(this.geometry, this.material);
  }

  async setText(text: string) {
    const font = await new FontLoader().loadAsync('/assets/helvetiker_regular.typeface.json', );
    this.geometry = new TextGeometry(text, {
      font: font,
      size: 1,
      height: 1,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 5
    } as any);
    this.geometry.computeBoundingBox();
    this.remove(this.mesh);
    this.mesh = new Mesh(this.geometry, this.material);
    this.textChanged.emit(this.mesh);
    this.add(this.mesh);
    return this.mesh;
  }
}
