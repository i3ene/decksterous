import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityButtonComponent } from './visibility-button.component';

describe('VisibilityButtonComponent', () => {
  let component: VisibilityButtonComponent;
  let fixture: ComponentFixture<VisibilityButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
