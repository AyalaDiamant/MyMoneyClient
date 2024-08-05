import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensReportComponent } from './expens-report.component';

describe('ExpensReportComponent', () => {
  let component: ExpensReportComponent;
  let fixture: ComponentFixture<ExpensReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
