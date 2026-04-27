import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianBoard } from './librarian-board';

describe('LibrarianBoard', () => {
  let component: LibrarianBoard;
  let fixture: ComponentFixture<LibrarianBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(LibrarianBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
