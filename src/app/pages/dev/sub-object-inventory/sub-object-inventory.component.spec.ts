import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSubObjectInventoryComponent } from './sub-object-inventory.component';

describe('SubObjectInventoryComponent', () => {
  let component: DevSubObjectInventoryComponent;
  let fixture: ComponentFixture<DevSubObjectInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevSubObjectInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevSubObjectInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
