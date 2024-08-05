import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingReportsComponent } from './moving-reports.component';

describe('MovingReportsComponent', () => {
  let component: MovingReportsComponent;
  let fixture: ComponentFixture<MovingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
