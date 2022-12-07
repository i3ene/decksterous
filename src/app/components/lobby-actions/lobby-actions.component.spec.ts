import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyActionsComponent } from './lobby-actions.component';

describe('LobbyActionsComponent', () => {
  let component: LobbyActionsComponent;
  let fixture: ComponentFixture<LobbyActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
