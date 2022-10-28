import { ElementRef } from "@angular/core";
import { Color, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from "three";

export class ThreeLogic {

  private canvasRef!: ElementRef;

  /** Stage Properties **/

  public cameraZ: number = 4;

  public fieldOfView: number = 50;

  public nearClippingPlane: number = 0.1;

  public farClippingPlane: number = 1000;

  /** Helper Properties **/

  public camera!: PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new TextureLoader;

  private renderer!: WebGLRenderer;

  public scene!: Scene;

  public renderList: { (): void }[] = [];


  /** Constructor **/

  constructor(canvasRef: ElementRef) {
    this.canvasRef = canvasRef;
  }

  /** Scene Setup **/

  public createScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);
    
    let aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /** Render Setup **/

  public startRenderingLoop() {
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ThreeLogic = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderList.forEach(fn => fn());
      component.renderer.render(component.scene, component.camera);
    }());
  }
  
}