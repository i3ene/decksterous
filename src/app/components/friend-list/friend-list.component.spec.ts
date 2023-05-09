import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { FriendListComponent } from './friend-list.component';

describe('FriendListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the list', () => {
    component.filterList();
  });

  it('should search friends', () => {
    let test: string = "test";
    component.searchFriends(test);
  });

  it('should load users', () => {
    let test: string = "test";
    component.loadUsers(test);
  });

  it('should search users', () => {
    let test: string = "test";
    component.searchUsers(test);
  });

  it('should load requests', () => {
    let test: number = 1;
    component.loadRequests(test);
  });

  it('should filter the list', () => {
    let test: number = 1;
    component.loadInvites(test);
  });

  it('should filter the list', () => {
    let test: number = 1;
    component.loadFriends(test);
  });

  it('should filter the list', () => {
    let test: boolean = true;
    component.setSearch(test);
  });
});
