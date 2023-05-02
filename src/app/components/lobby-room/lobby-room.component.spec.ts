import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'src/app/app.module';
import {LobbyRoomComponent} from "./lobby-room.component";

describe('LobbyRoomComponent', () => {
  let component: LobbyRoomComponent;
  let fixture: ComponentFixture<LobbyRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
