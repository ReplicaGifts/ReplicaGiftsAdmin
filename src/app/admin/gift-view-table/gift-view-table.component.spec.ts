import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftViewTableComponent } from './gift-view-table.component';

describe('GiftViewTableComponent', () => {
  let component: GiftViewTableComponent;
  let fixture: ComponentFixture<GiftViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftViewTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
