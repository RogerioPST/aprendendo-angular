import { TestBed } from '@angular/core/testing';

import { MeusSettingsService } from './meus-settings.service';

describe('MeusSettingsService', () => {
  let service: MeusSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeusSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
