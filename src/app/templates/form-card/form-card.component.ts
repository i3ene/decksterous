import { Component, ContentChild, ContentChildren, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent {
  @Input() title!: string;
  @Input() navigation!: any;

  @ContentChild('header') header!: TemplateRef<any>;
  @ContentChild('content') content!: TemplateRef<any>;
  @ContentChild('footer') footer!: TemplateRef<any>;
  @ContentChild('row') row!: TemplateRef<any>;
}
