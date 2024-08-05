import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingsComponent } from './movings.component';

describe('MovingsComponent', () => {
  let component: MovingsComponent;
  let fixture: ComponentFixture<MovingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
