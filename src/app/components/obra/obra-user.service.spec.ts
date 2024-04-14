import { TestBed } from '@angular/core/testing';

import { ObraUserService } from './obra-user.service';

describe('ObraUserService', () => {
  let service: ObraUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObraUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
