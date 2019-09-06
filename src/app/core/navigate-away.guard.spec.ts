import { TestBed, async, inject } from '@angular/core/testing';

import { NavigateAwayGuard } from './navigate-away.guard';

describe('NavigateAwayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigateAwayGuard]
    });
  });

  it('should ...', inject([NavigateAwayGuard], (guard: NavigateAwayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
