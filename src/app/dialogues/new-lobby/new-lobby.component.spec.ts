import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLobbyDialogue } from './new-lobby.component';

describe('NewLobbyComponent', () => {
  let component: NewLobbyDialogue;
  let fixture: ComponentFixture<NewLobbyDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLobbyDialogue ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLobbyDialogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
