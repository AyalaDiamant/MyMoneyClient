import { TestBed } from '@angular/core/testing';
import { IsPermissionGuard } from './is-permission.guard';



describe('IsPermissionGuard', () => {
  let guard: IsPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
