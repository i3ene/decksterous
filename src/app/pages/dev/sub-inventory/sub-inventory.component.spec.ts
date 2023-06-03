import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSubInventoryComponent } from './sub-inventory.component';

describe('SubInventoryComponent', () => {
  let component: DevSubInventoryComponent;
  let fixture: ComponentFixture<DevSubInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevSubInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevSubInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
