import { TestBed } from '@angular/core/testing';

import { Huellitas } from './huellitas';

describe('Huellitas', () => {
  let service: Huellitas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Huellitas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
