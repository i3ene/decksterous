import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'src/app/app.module';
import {FriendMenuListComponent} from "./friend-menu-list.component";

describe('FriendMenuListComponent', () => {
  let component: FriendMenuListComponent;
  let fixture: ComponentFixture<FriendMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
