import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListSearchComponent } from './friend-list-search.component';

describe('FriendListSearchComponent', () => {
  let component: FriendListSearchComponent;
  let fixture: ComponentFixture<FriendListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
