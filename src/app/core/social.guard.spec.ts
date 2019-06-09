import { TestBed, async, inject } from '@angular/core/testing';

import { SocialGuard } from './social.guard';

describe('SocialGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialGuard]
    });
  });

  it('should ...', inject([SocialGuard], (guard: SocialGuard) => {
    expect(guard).toBeTruthy();
  }));
});
