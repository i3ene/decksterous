import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'template-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchTemplate {
  @Input() title!: string;
  @Output() textEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

}
