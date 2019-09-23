import { TestBed } from '@angular/core/testing';

import { FlatService } from './flat.service';

describe('FlatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlatService = TestBed.get(FlatService);
    expect(service).toBeTruthy();
  });
});
