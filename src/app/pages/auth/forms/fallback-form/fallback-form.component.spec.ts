import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallbackForm } from './fallback-form.component';

describe('FallbackFormComponent', () => {
  let component: FallbackForm;
  let fixture: ComponentFixture<FallbackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallbackForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FallbackForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
