import { ElementRef, isDevMode } from '@angular/core';
import { IScene } from 'src/app/models/object/scene.model';
import { Color, Mesh, Path, PerspectiveCamera, Scene, TextureLoader, Vector3, WebGLRenderer } from 'three';
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

  public loopFunctions: { (threeLogic: ThreeLogic): void }[] = [];

  /** Constructor **/

  constructor(canvas: ElementRef | HTMLCanvasElement) {
    this.canvas = canvas instanceof ElementRef ? canvas.nativeElement : canvas;
    if (isDevMode()) this.statsPanel();
  }

  private statsPanel() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.left = 'unset';
    this.stats.dom.style.right = '0px';
    this.canvas.parentElement?.appendChild(this.stats.dom);
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

      component.loopFunctions.forEach((fn) => fn(component));
      component.renderer.render(component.scene, component.camera);

      component.stats.end();
      TWEEN.update(time * 0.1);
      requestAnimationFrame(render);
    })(component.time.previous);
  }

  /** Engine Setup **/

  public registerScene(scene: IScene) {
    this.createScene();
    this.startRenderingLoop();
    scene.bind(this);
  }

  /** Functions **/

  public move(position: Vector3 | Mesh, to: Vector3 | Path, speed: number, translate: boolean = true) {
    const from = position instanceof Mesh ? position.position : position;
    if (to instanceof Vector3) {
      const duration = from.distanceTo(to) * 1000 / speed;
      let origin = from.clone();
      const tween = new TWEEN.Tween(translate ? new Vector3(0, 0, 0) : from);
      if (translate) tween.to(to, duration).onUpdate(vec => {
        from.x = vec.x + origin.x;
        from.y = vec.y + origin.y;
        from.z = vec.z + origin.z;
      });
      else tween.to(to, duration)
      tween.onStart(vec => {
        origin = from.clone();
      });
      tween.delay(0).repeatDelay(0);
      return tween;
    } else {
      // TODO: Path Logic
      return new TWEEN.Tween(from);
    }
  }

}
