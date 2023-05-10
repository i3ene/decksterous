import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplacePage } from './marketplace.component';

describe('MarketplaceComponent', () => {
  let component: MarketplacePage;
  let fixture: ComponentFixture<MarketplacePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplacePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
