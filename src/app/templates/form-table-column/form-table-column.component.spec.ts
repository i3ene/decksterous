import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTableColumnTemplate } from './form-table-column.component';

describe('FormTableColumnComponent', () => {
  let component: FormTableColumnTemplate;
  let fixture: ComponentFixture<FormTableColumnTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTableColumnTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTableColumnTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
