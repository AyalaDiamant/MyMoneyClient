import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueByDaysComponent } from './revenue-by-days.component';

describe('RevenueByDaysComponent', () => {
  let component: RevenueByDaysComponent;
  let fixture: ComponentFixture<RevenueByDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueByDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueByDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
