import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'src/app/app.module';
import {ProfileAvatarComponent} from "./profile-avatar.component";

describe('ProfileAvatarComponent', () => {
  let component: ProfileAvatarComponent;
  let fixture: ComponentFixture<ProfileAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
