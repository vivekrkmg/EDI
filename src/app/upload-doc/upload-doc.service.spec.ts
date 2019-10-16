import { TestBed } from '@angular/core/testing';

import { UploadDocService } from './upload-doc.service';

describe('UploadDocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadDocService = TestBed.get(UploadDocService);
    expect(service).toBeTruthy();
  });
});
