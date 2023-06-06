import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellItemDialogue } from './sell-item.component';

describe('SellItemComponent', () => {
  let component: SellItemDialogue;
  let fixture: ComponentFixture<SellItemDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellItemDialogue ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellItemDialogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
