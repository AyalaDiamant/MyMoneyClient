import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryreportComponent } from './historyreport.component';

describe('HistoryreportComponent', () => {
  let component: HistoryreportComponent;
  let fixture: ComponentFixture<HistoryreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
