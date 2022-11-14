import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCardAbilityComponent } from './card-ability.component';

describe('CardAbilityComponent', () => {
  let component: DevCardAbilityComponent;
  let fixture: ComponentFixture<DevCardAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevCardAbilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevCardAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
