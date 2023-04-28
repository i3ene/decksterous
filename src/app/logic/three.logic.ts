import { ElementRef, isDevMode } from '@angular/core';
import { IScene } from 'src/app/models/object/scene.model';
import { Color, Intersection, Mesh, Object3D, Path, PerspectiveCamera, Raycaster, Scene, TextureLoader, Vector2, Vector3, WebGLRenderer } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { Tween } from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Stats from 'stats.js';

export class ThreeLogic {
  private canvas!: HTMLCanvasElement;

  /** Stage Properties **/

  public cameraZ: number = 4;

  public fieldOfView: number = 50;

  public nearClippingPlane: number = 0.1;

  public farClippingPlane: number = 1000;

  public controls: OrbitControls | undefined;

  /** Helper Properties **/

  public time: { delta: number; current: number, previous: number } = { delta: 0, current: 0, previous: 0 };

  public stats!: Stats;

  public camera!: PerspectiveCamera;

  private loader = new TextureLoader();

  private renderer!: WebGLRenderer;

  public scene!: Scene;

  public loadedScenes: Map<string, IScene> = new Map();

  public loadedObjects: { scene: IScene, object: Object3D }[] = [];

  public raycaster = new Raycaster();

  /**
   * If pointer actions are transitive
   */
  public transitive = false;

  /**
   * @param x Position X
   * @param y Position Y
   * @param z Button
   */
  public pointer = new Vector3();

  private _intersects: Intersection<Object3D>[] = [];
  public set intersects(value: Intersection<Object3D>[]) {
    this._intersects = value;
    // Update pointer
    this.updateIntersections(this.pointer.z);
    // Reset button
    this.pointer.z = 0;
  }
  public get intersects(): Intersection<Object3D>[] {
    return this._intersects;
  }

  /**
   * Last clicked elements
   */
  public lastClick: { object: Object3D, button: number }[] = [];

  /** Constructor **/

  constructor(canvas: ElementRef | HTMLCanvasElement) {
    this.canvas = canvas instanceof ElementRef ? canvas.nativeElement : canvas;
    document.addEventListener('pointermove', this.onPointerMove.bind(this));
    document.addEventListener('pointerdown', this.onPointerDown.bind(this));
    if (isDevMode()) this.statsPanel();
    this.createScene();
    this.startRenderingLoop();
  }

  private statsPanel() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.left = 'unset';
    this.stats.dom.style.right = '0px';
    this.canvas.parentElement?.appendChild(this.stats.dom);
  }

  /** Listener **/

  public onPointerDown(event: any) {
    this.pointer.z = event.buttons
    this.onPointerMove(event);
  }

  public onPointerMove(event: any) {
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  /** Scene Setup **/

  public createScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);

    let aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(this.fieldOfView, aspectRatio, this.nearClippingPlane, this.farClippingPlane);
    this.camera.position.z = this.cameraZ;
    this.camera.castShadow = true;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /** Render Setup **/

  public startRenderingLoop() {
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: false });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    if (isDevMode()) this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    let component: ThreeLogic = this;
    (function render(time: number) {
      component.stats.begin();
      component.time.current = time;
      component.time.delta = time - component.time.previous;
      component.time.previous = time;

      component.raycaster.setFromCamera(component.pointer, component.camera);
      component.intersects = component.raycaster.intersectObjects(component.scene.children, true);

      component.loadedScenes.forEach((sc) => Object.entries(sc.functions ?? {}).forEach((fn) => fn[1](component)));
      component.renderer.render(component.scene, component.camera);

      component.stats.end();
      TWEEN.update(time * 0.1);
      requestAnimationFrame(render);
    })(component.time.previous);
  }

  /** Engine Setup **/

  public updateIntersections(button?: number) {
    const exception = [];
    // Selection
    for (const intersection of this.intersects) {
      if (intersection.object.selectable == true) {
        intersection.object.selected = true;
        // Add to exception list
        exception.push(intersection.object);
        if (!this.transitive) break;
      }
    }
    // Click
    for (const intersection of this.intersects) {
      if (intersection.object.clickable == true && button) {
        intersection.object.clicked = button;
        if (!this.transitive) break;
      }
    }

    // Deselect
    this.deselect([this.scene], exception);
  }

  public deselect(objects: Object3D[], exclude?: Object3D[]) {
    for (const object of objects) {
      if (!exclude?.some(x => x == object)) object.selected = false;
      this.deselect(object.children, exclude);
    }
  }

  public loadScene(scene: IScene) {
    this.unloadScene(scene);
    this.loadedScenes.set(scene.constructor.name, scene);
    if (scene.bind) scene.bind(this);
  }

  public unloadScene(scene: IScene) {
    if (scene.unbind) scene.unbind(this);
    const objects = this.loadedObjects.filter(x => x.scene == scene).map(x => x.object);
    this.scene.remove(...objects);
    this.loadedObjects = this.loadedObjects.filter(x => x.scene != scene);
    this.loadedScenes.delete(scene.constructor.name);
  }

  public unloadScenes() {
    this.loadedScenes.forEach(this.unloadScene.bind(this));
  }

  public loadObject(ref: IScene, ...object: Object3D[]) {
    object.forEach(x => {
      this.loadedObjects.push({ scene: ref, object: x });
      this.scene.add(x);
    });
  }

  public removeObject(ref: IScene, ...object: Object3D[]) {
    object.forEach(x => {
      this.loadedObjects = this.loadedObjects.filter(y => !(y.scene == ref && y.object == x));
      this.scene.add(x);
    });
  }

  /** Functions **/

  // TODO: Move/Animate

}
