import { TestBed } from '@angular/core/testing';

import { MyFirmService } from './my-firm.service';

describe('MyFirmService', () => {
  let service: MyFirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
