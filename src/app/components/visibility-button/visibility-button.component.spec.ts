import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'src/app/app.module';
import {VisibilityButtonComponent} from "./visibility-button.component";

describe('VisibilityButtonComponent', () => {
  let component: VisibilityButtonComponent;
  let fixture: ComponentFixture<VisibilityButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    let element: any = null;
    component.passwordVisibilityToggle(element);
  });

  it('should create', () => {
    let element: any = null;
    component.getVisibilityIcon(element);
  });
});
