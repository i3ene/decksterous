import { IScene } from "src/app/models/object/scene.model";
import { ThreeLayer, ThreeLogic } from "../three.logic";
import { Table3D } from "src/app/models/3D/table.3d";
import { Glass3D } from "src/app/models/3D/glass.3d";
import { DirectionalLight, HemisphereLight } from "three";
import * as THREE from "three";
import { PlaneThree } from "src/app/models/three/plane.three";
import { SphereThree } from "src/app/models/three/sphere.three";

export class TableScene implements IScene {
  ambient: HemisphereLight = new HemisphereLight(0x95ddff, 0x498f8c, 1);
  light: THREE.SpotLight = new THREE.SpotLight(0xfaefd4, 0.8, 50, THREE.MathUtils.degToRad(60), 0.6);

  carpetTexture: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/red_carpet.jpg" );
  carpetDisplacement: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/red_carpet_displacement.jpg" );
  carpetNormal: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/red_carpet_normal.jpg" );
  carpetAo: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/red_carpet_ao.jpg" );
  carpetRoughness: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/red_carpet_roughness.jpg" );
  carpetMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ 
    map: this.carpetTexture,
    bumpMap: this.carpetDisplacement,
    normalMap: this.carpetNormal,
    normalMapType: THREE.ObjectSpaceNormalMap,
    aoMap: this.carpetAo,
    roughnessMap: this.carpetRoughness,
    color: 0x994444
  });

  wallTexture: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/wallpaper_wood_wall.jpg" );
  wallDisplacement: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/wallpaper_wood_wall_displacement.jpg" );
  wallNormal: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/wallpaper_wood_wall_normal.jpg" );
  wallAo: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/wallpaper_wood_wall_ao.jpg" );
  wallRoughness: THREE.Texture = new THREE.TextureLoader().load( "assets/textures/wallpaper_wood_wall_roughness.jpg" );
  wallMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ 
    map: this.wallTexture,
    bumpMap: this.wallDisplacement,
    normalMap: this.wallNormal,
    normalMapType: THREE.ObjectSpaceNormalMap,
    aoMap: this.wallAo,
    roughnessMap: this.wallRoughness,
    color: 0xccaaaa
  });

  table: Table3D = new Table3D();
  glass: Glass3D = new Glass3D();
  wall: THREE.Group = new THREE.Group();
  bottom: PlaneThree = new PlaneThree(this.carpetMaterial);
  left: PlaneThree = new PlaneThree(this.wallMaterial);
  right: PlaneThree = new PlaneThree(this.wallMaterial);
  front: PlaneThree = new PlaneThree(this.wallMaterial);
  top: PlaneThree = new PlaneThree(new THREE.MeshStandardMaterial({ color: 0x555555 }));

  lamp: SphereThree = new SphereThree(new THREE.MeshBasicMaterial({ color: 0xddaa33 }));

  constructor() {
    this.ambient.position.set(0, 10, 0);

    this.light.castShadow = true;
    this.light.shadow.mapSize = new THREE.Vector2(4096, 4096);

    this.lamp.scale.set(1.75, 1.75, 1.75);
    this.lamp.mesh.castShadow = false;
    this.lamp.mesh.layers.enable(ThreeLayer.BLOOM);
    this.lamp.position.y = 10;
    this.lamp.add(this.light);

    this.table.scale.set(2, 2, 2);

    this.glass.scale.set(0.75, 0.75, 0.75);
    this.glass.position.set(5, 0.9, 2);

    this.bottom.position.set(0, -0.5, 0);
    this.wall.add(this.bottom);

    this.top.position.set(0, 0.5, 0);
    this.top.rotation.x = THREE.MathUtils.degToRad(180);
    this.wall.add(this.top);

    this.front.position.set(0, 0, -0.5);
    this.front.rotation.x = THREE.MathUtils.degToRad(90);
    this.wall.add(this.front);

    this.left.position.set(-0.5, 0, 0);
    this.left.rotation.z = THREE.MathUtils.degToRad(-90);
    this.left.rotation.x = THREE.MathUtils.degToRad(90);
    this.wall.add(this.left);

    this.right.position.set(0.5, 0, 0);
    this.right.rotation.z = THREE.MathUtils.degToRad(90);
    this.right.rotation.x = THREE.MathUtils.degToRad(90);
    this.wall.add(this.right);

    this.wall.scale.set(40, 20, 40);
    this.wall.position.y = 2;

    // this.carpetTexture.wrapS = THREE.RepeatWrapping;
    // this.carpetTexture.wrapT = THREE.RepeatWrapping;
    // this.carpetTexture.repeat.set( 4, 4 );
  }

  bind(threeLogic: ThreeLogic) {
    threeLogic.loadObject(this, this.ambient, this.table, this.glass, this.wall, this.lamp);
    this.camerSetup(threeLogic.camera);
  }

  camerSetup(camera: THREE.Camera) {
    camera.position.set(0, 6, 12);
    camera.rotateX(THREE.MathUtils.degToRad(-30));
  }
}