import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: DevItemComponent;
  let fixture: ComponentFixture<DevItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
