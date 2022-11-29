import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchTemplate } from './form-search.component';

describe('FormSearchComponent', () => {
  let component: FormSearchTemplate;
  let fixture: ComponentFixture<FormSearchTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSearchTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSearchTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
