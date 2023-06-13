import { EventEmitter } from '@angular/core';
import * as THREE from 'three';
import { Material, Mesh, MeshStandardMaterial } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export class TextThree extends THREE.Group {
  material: Material = new THREE.MeshBasicMaterial( {
    color: 0x000000,
    side: THREE.DoubleSide
  } );
  mesh!: Mesh;
  geometry!: TextGeometry;

  lineLength: number = 12;

  _text: string = "";
  set text(value: string) {
    const words: string[] = value.split(" ");
    value = "";
    let size = 0;
    for(const word of words) {
      size += word.length;
      if (size > this.lineLength) {
        size = 0;
        value += '\n';
        size += word.length;
      }
      value += " " + word;
    }

    this._text = value;
    this.setText(this.text);
  }
  get text(): string {
    return this._text.replace("\n", "");
  }
  textChanged: EventEmitter<Mesh> = new EventEmitter<Mesh>();

  static font?: Font;
  static fetchingFont: boolean = false;

  constructor(material?: Material) {
    super();
    if (material) this.material = material;

    this.mesh = new Mesh(this.geometry, this.material);
  }

  async setText(text: string) {
    while(TextThree.fetchingFont) {
      await new Promise(res => setTimeout(res, 250));
    }

    if (!TextThree.font) {
      TextThree.fetchingFont = true;
      TextThree.font = await new FontLoader().loadAsync('/assets/helvetiker_regular.typeface.json');
      TextThree.fetchingFont = false;
    }

    this.geometry = new TextGeometry(text, {
      font: TextThree.font,
      size: 1,
      height: 0.1,
      curveSegments: 2,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1
    } as any);
    this.remove(this.mesh);
    this.mesh = new Mesh(this.geometry, this.material);
    this.textChanged.emit(this.mesh);
    this.add(this.mesh);
    return this.mesh;
  }
}
