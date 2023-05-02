import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { LoginForm } from './login-form.component';
import { Config } from 'src/app/config/config';


describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should login`, waitForAsync(async () => {
    const fixture = TestBed.createComponent(LoginForm);
    const app = fixture.debugElement.componentInstance;
    app.credentials = { name: 'admin', password: 'admin' };
    await app.login();
    expect(localStorage[Config.AuthToken]).toBeDefined();
  }));
});
