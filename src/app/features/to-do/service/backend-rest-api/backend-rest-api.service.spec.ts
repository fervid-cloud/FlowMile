import { TestBed } from '@angular/core/testing';

import { BackendRestApiService } from './backend-rest-api.service';

describe('BackendRestApiService', () => {
  let service: BackendRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
