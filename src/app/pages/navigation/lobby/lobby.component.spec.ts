import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPage } from './lobby.component';

describe('LobbyComponent', () => {
  let component: LobbyPage;
  let fixture: ComponentFixture<LobbyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
