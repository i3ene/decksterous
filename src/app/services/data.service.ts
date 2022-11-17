import { EventEmitter, Injectable } from '@angular/core';
import { InputServiceEvent } from '../models/object/service.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public maxSize: number = 400000;
  public uploadEvent: EventEmitter<InputServiceEvent> = new EventEmitter<InputServiceEvent>();

  maxImgHeight: number = 200;
  maxImgWidth: number = 200;
  imgType: 'jpeg' | 'png' = 'jpeg';
  imgScale: number = 0.7;

  uploadImage(e: any, source: any): void {
    const file: any = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern: RegExp = /image-*/;
    const reader: FileReader = new FileReader();
    if (!file.type.match(pattern)) return alert('invalid format');
    reader.onload = (re: ProgressEvent<FileReader>) => this._handleImageLoaded(re, source);
    reader.readAsDataURL(file);
  }

  _handleImageLoaded(e: ProgressEvent<FileReader>, source: any): void {
    const reader: FileReader | null = e.target;

    if (!reader?.result) {
      console.warn('Cannot read!');
    } else if (
      (reader.result instanceof String && reader.result.length > this.maxSize) ||
      (reader.result instanceof ArrayBuffer && reader.result.byteLength > this.maxSize)
    ) {
      console.warn(`File size should be less than ${this.maxSize / 1000} KB!`);
    } else if (typeof reader.result == 'string') {
      this._compressImage(source, reader.result);
    }
  }

  _compressImage(source: any, data: string): any {
    const image = new Image();
    image.src = data;
    image.onload = () => {
      const resized = this._resizeImage(image);
      this.uploadEvent.emit({ source: source, data: resized });
    };
  }

  _resizeImage(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    let width: number = img.width;
    let height: number = img.height;

    if ((width > height) && (width > this.maxImgWidth)) {
        height = Math.round((height *= this.maxImgWidth / width));
        width = this.maxImgWidth;
    } else if (height > this.maxImgHeight) {
        width = Math.round((width *= this.maxImgHeight / height));
        height = this.maxImgHeight;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(img, 0, 0, width, height);

    const preview: HTMLDivElement = document.createElement("div");
    preview.appendChild(canvas);

    return canvas.toDataURL('image/' + this.imgType, this.imgScale);
  }
}
