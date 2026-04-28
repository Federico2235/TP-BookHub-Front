import { TestBed } from '@angular/core/testing';

import { LibrarianGuard } from './librarian-guard';

describe('LibrarianGuard', () => {
  let service: LibrarianGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarianGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
