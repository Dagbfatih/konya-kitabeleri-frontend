import { TestBed } from '@angular/core/testing';

import { CheckinLocalService } from './checkin-local.service';

describe('CheckinLocalService', () => {
  let service: CheckinLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckinLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
