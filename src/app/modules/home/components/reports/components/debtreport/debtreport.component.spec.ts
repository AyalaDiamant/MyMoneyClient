import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtreportComponent } from './debtreport.component';

describe('DebtreportComponent', () => {
  let component: DebtreportComponent;
  let fixture: ComponentFixture<DebtreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
