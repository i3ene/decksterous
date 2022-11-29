import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeckDialogue } from './card-deck.component';

describe('CardDeckComponent', () => {
  let component: CardDeckDialogue;
  let fixture: ComponentFixture<CardDeckDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDeckDialogue ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeckDialogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
