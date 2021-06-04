import { TestBed } from '@angular/core/testing';

import { UserPreferenceService } from './user-preference.service';

xdescribe('UserPreferenceService', () => {
  let service: UserPreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
