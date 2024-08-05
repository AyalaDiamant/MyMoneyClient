import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TithereportComponent } from './tithereport.component';

describe('TithereportComponent', () => {
  let component: TithereportComponent;
  let fixture: ComponentFixture<TithereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TithereportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TithereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
