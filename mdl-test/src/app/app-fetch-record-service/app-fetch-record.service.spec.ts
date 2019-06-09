import { TestBed } from '@angular/core/testing';

import { AppFetchRecordService } from './app-fetch-record.service';

describe('AppFetchRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppFetchRecordService = TestBed.get(AppFetchRecordService);
    expect(service).toBeTruthy();
  });
});
