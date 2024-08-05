import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueByProductComponent } from './revenue-by-product.component';

describe('RevenueByProductComponent', () => {
  let component: RevenueByProductComponent;
  let fixture: ComponentFixture<RevenueByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueByProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
