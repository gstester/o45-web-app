import { TestBed } from '@angular/core/testing';

import { CostKeyService } from './cost-key.service';

describe('CostKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostKeyService = TestBed.get(CostKeyService);
    expect(service).toBeTruthy();
  });
});
