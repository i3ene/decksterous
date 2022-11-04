import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'visibility-button',
  templateUrl: './visibility-button.component.html',
  styleUrls: ['./visibility-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisibilityButtonComponent implements OnInit {

  @Input() element!: HTMLInputElement;

  constructor() { }

  ngOnInit(): void {
  }

  passwordVisibilityToggle(element: any) {
    if (element == null) return;
    element.type == 'text'
      ? (element.type = 'password')
      : (element.type = 'text');
  }

  getVisibilityIcon(element: any) {
    if (element == null) return;
    return element.type == 'text' ? 'visibility_off' : 'visibility';
  }

}
