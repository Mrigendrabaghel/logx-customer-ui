import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TrackOrderService } from '../trackAndTrace/track-order.service';
import { AccessDocumentService } from './access-document.service';

describe('AccessDocumentService', () => {
  let service: AccessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientModule]
    });
    service = TestBed.inject(AccessDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('access document service GetAccessDocument() method call ',()=>{

    expect(service.GetAccessDocument).toBeTruthy();
   
  });

// it('should return an error when the server returns a 404', () => {
//   const errorResponse = new HttpErrorResponse({
//     error: 'test 404 error',
//     status: 404, statusText: 'Not Found'
//   });

// });
});
