import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailForm } from './email-form.component';

describe('EmailFormComponent', () => {
  let component: EmailForm;
  let fixture: ComponentFixture<EmailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
