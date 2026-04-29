import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileOwnerGuard } from './profile-owner-guard';

describe('profileOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => profileOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
