import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTableTemplate } from './form-table.component';

describe('FormTableComponent', () => {
  let component: FormTableTemplate;
  let fixture: ComponentFixture<FormTableTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTableTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTableTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
