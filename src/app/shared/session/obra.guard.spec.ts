import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { obraGuard } from './obra.guard';

describe('obraGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => obraGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
