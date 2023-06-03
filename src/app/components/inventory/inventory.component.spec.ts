import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from 'src/app/app.module';
import {InventoryComponent} from "./inventory.component";

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.reload();
  });

  it('should create', () => {
    let type: 'subInventory' | 'user' | 'inventory' = 'subInventory' ;
    let id: number = 1;

    component.setId(type, id);
  });


  it('should create', () => {
    let type: 'subInventory' | 'user' | 'inventory' = 'subInventory' ;
    let id: number = 1;

    component.loadItems(id, type);
  });

});
