import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'src/app/app.module';
import {ProfileItemComponent} from "./profile-item.component";

describe('ProfileItemComponent', () => {
  let component: ProfileItemComponent;
  let fixture: ComponentFixture<ProfileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create', () => {
    let id: number = 1;
    component.loadUser( id);
  });
});
