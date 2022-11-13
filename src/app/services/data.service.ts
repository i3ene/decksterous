import { EventEmitter, Injectable } from '@angular/core';
import { InputServiceEvent } from '../models/object/service.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public maxSize: number = 400000;
  public uploadEvent: EventEmitter<InputServiceEvent> = new EventEmitter<InputServiceEvent>();

  uploadInput(e: any, source: any): void {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = (re: any) => this._handleReaderLoaded(re, source);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any, source: any): void {
    const reader = e.target;

    if (!reader.result) {
      console.warn("Cannot read!");
    } else if (reader.result.length > this.maxSize) {
      console.warn(`File size should be less than ${this.maxSize / 1000} KB!`);
    } else {
      this.uploadEvent.emit({ source: source, data: reader.result});
    }
  }

}
