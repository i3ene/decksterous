import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevUserInventoryComponent } from './user-inventory.component';

describe('UserInventoryComponent', () => {
  let component: DevUserInventoryComponent;
  let fixture: ComponentFixture<DevUserInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevUserInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevUserInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
