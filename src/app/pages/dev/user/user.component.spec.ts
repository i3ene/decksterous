import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: DevUserComponent;
  let fixture: ComponentFixture<DevUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
