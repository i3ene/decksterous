import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDeckInventoryComponent } from './deck-inventory.component';

describe('DeckInventoryComponent', () => {
  let component: DevDeckInventoryComponent;
  let fixture: ComponentFixture<DevDeckInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevDeckInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevDeckInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
