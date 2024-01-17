import { TestBed } from '@angular/core/testing';

import { WycieczkaFiltrService } from './wycieczka-filtr.service';

describe('WycieczkaFiltrService', () => {
  let service: WycieczkaFiltrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WycieczkaFiltrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
