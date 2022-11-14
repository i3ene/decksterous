import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCardTypeComponent } from './card-type.component';

describe('CardTypeComponent', () => {
  let component: DevCardTypeComponent;
  let fixture: ComponentFixture<DevCardTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevCardTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevCardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
