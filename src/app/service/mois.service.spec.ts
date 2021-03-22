import { TestBed } from '@angular/core/testing';

import { MoisService } from './mois.service';

describe('MoisService', () => {
  let service: MoisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
