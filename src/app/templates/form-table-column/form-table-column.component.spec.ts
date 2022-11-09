import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTableColumnComponent } from './form-table-column.component';

describe('FormTableColumnComponent', () => {
  let component: FormTableColumnComponent;
  let fixture: ComponentFixture<FormTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTableColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
