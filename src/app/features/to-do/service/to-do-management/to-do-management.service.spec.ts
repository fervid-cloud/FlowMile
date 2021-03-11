import { TestBed } from '@angular/core/testing';

import { ToDoManagementService } from './to-do-management.service';

describe('ToDoManagementService', () => {
  let service: ToDoManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
