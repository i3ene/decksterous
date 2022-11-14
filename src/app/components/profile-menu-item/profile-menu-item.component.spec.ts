import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuItemComponent } from './profile-menu-item.component';

describe('ProfileMenuItemComponent', () => {
  let component: ProfileMenuItemComponent;
  let fixture: ComponentFixture<ProfileMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
