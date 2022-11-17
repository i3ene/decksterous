import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendMenuListComponent } from './friend-menu-list.component';

describe('FriendMenuListComponent', () => {
  let component: FriendMenuListComponent;
  let fixture: ComponentFixture<FriendMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendMenuListComponent ]
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
