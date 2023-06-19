import { ElementRef, isDevMode } from '@angular/core';
import { IScene } from 'src/app/models/object/scene.model';
import { Color, Intersection, Layers, Material, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, Path, PerspectiveCamera, Raycaster, Scene, ShaderMaterial, TextureLoader, Vector2, Vector3, WebGLRenderer } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { Tween } from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Stats from 'stats.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CustomShader } from '../models/three/shaders/shader.materials';
import { SettingsService } from '../services/settings.service';

export enum ThreeLayer {
  ALL,
  BLOOM
}

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

  private render: { 
    renderer: WebGLRenderer;
    pass: RenderPass;
    final: {
      pass: ShaderPass;
      composer: EffectComposer;
    };
    bloom: {
      pass: UnrealBloomPass;
      composer: EffectComposer;
      layer: Layers;
      material: Material;
      materials: {
        [key: string]: Material;
      };
    };
  } = {
    final: {},
    bloom: {
      material: new MeshBasicMaterial({ color: 0x000 }),
      materials: {}
    }
  } as any;

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

  constructor(canvas: ElementRef | HTMLCanvasElement, public settings: SettingsService) {
    this.canvas = canvas instanceof ElementRef ? canvas.nativeElement : canvas;

    document.addEventListener('pointermove', this.onPointerMove.bind(this));
    document.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.createScene();
    this.startRenderingLoop();

    if (isDevMode()) this.statsPanel();
    if (isDevMode()) this.controls = new OrbitControls(this.camera, this.render.renderer.domElement);
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

  public onWindowResize(){
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.render.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render.bloom.pass.setSize(window.innerWidth, window.innerHeight);
    this.render.bloom.composer.setSize(window.innerWidth, window.innerHeight);
    this.render.final.composer.setSize(window.innerWidth, window.innerHeight);
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
    this.render.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: false });
    this.render.renderer.shadowMap.enabled = true;

    var renderQuality = 1;
    if (this.settings.Game_Quality < 2) renderQuality /= 2; 
    this.render.renderer.setPixelRatio(devicePixelRatio * renderQuality);
    this.render.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.render.pass = new RenderPass(this.scene, this.camera);

    this.render.bloom.layer = new Layers();
    this.render.bloom.layer.set(ThreeLayer.BLOOM);
    this.render.bloom.pass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.6, 0.9, 0.1);

    this.render.bloom.composer = new EffectComposer(this.render.renderer);
    this.render.bloom.composer.renderToScreen = false;
    this.render.bloom.composer.addPass(this.render.pass);
    this.render.bloom.composer.addPass(this.render.bloom.pass);

    this.render.final.pass = new ShaderPass(
      CustomShader.Bloom(this.render.bloom.composer.renderTarget2.texture),
      'baseTexture'
    );
    this.render.final.pass.needsSwap = true;

    this.render.final.composer = new EffectComposer(this.render.renderer);
    this.render.final.composer.addPass(this.render.pass);
    this.render.final.composer.addPass(this.render.final.pass);

    this.scene.traverse(this.disposeMaterial);

    let component: ThreeLogic = this;
    (function render(time: number) {
      component.stats?.begin();
      component.time.current = time;
      component.time.delta = time - component.time.previous;
      component.time.previous = time;

      component.raycaster.setFromCamera(component.pointer, component.camera);
      component.intersects = component.raycaster.intersectObjects(component.scene.children, true);

      component.loadedScenes.forEach((sc) => Object.entries(sc.functions ?? {}).forEach((fn) => fn[1](component)));

      // render scene with bloom
      if (component.settings.Game_Quality >= 3) component.renderBloom(true);
      // render the entire scene, then render bloom scene on top
      component.render.final.composer.render();

      component.stats?.end();
      TWEEN.update(time * 0.1);
      requestAnimationFrame(render);
    })(component.time.previous);
  }

  private renderBloom(mask: boolean) {
    if (mask == true) {
      this.scene.traverse(this.darkenNonBloomed.bind(this));
      this.render.bloom.composer.render();
      this.scene.traverse(this.restoreMaterial.bind(this));
    } else {
      this.camera.layers.set(ThreeLayer.BLOOM);
      this.render.bloom.composer.render();
      this.camera.layers.set(ThreeLayer.ALL);
    }
  }

  private darkenNonBloomed(obj: any) {
    if (obj.isMesh && this.render.bloom.layer.test(obj.layers) == false) {
      this.render.bloom.materials[obj.uuid] = obj.material;
      obj.material = this.render.bloom.material;
      obj.material.opacity = this.render.bloom.materials[obj.uuid].opacity;
    }
  }

  private restoreMaterial(obj: any) {
    if (this.render.bloom.materials[ obj.uuid ]) {
      obj.material = this.render.bloom.materials[obj.uuid];
      delete this.render.bloom.materials[obj.uuid];
    }
  }

  private disposeMaterial(obj: any) {
    if (obj.material) {
      obj.material.dispose();
    }
  }

  /** Engine Setup **/

  public updateIntersections(button?: number) {
    const exception = [];
    // Selection
    for (const intersection of this.intersects) {
      if (intersection.object.selectable == true) {
        if (!this.recurseParentDisabled(intersection.object)) {
          intersection.object.selected = true;
          // Add to exception list
          exception.push(intersection.object);
        }
        if (!this.transitive) break;
      }
    }
    // Click
    for (const intersection of this.intersects) {
      if (intersection.object.clickable == true && button) {
        if (!this.recurseParentDisabled(intersection.object)) {
          intersection.object.clicked = button;
        }
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

  public recurseParentDisabled(object: Object3D): boolean {
    if (object.disabled) return true;
    if (object.parent) {
      return this.recurseParentDisabled(object.parent);
    }
    return false;
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
