import { TestBed } from '@angular/core/testing';

import { ChildAuthGuardService } from './child-auth-guard.service';

describe('ChildAuthGuardService', () => {
  let service: ChildAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
