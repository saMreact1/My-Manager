import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from '../loader/loader.service';

describe('LoaderInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should call loaderService.isLoading with true and then false', () => {
    const loadingSpy = spyOn(loaderService.isLoading, 'next').and.callThrough();

    httpClient.get('/test-endpoint').subscribe();

    const req = httpMock.expectOne('/test-endpoint');
    expect(loadingSpy).toHaveBeenCalledWith(true); // Spinner ON
    req.flush({}); // Respond to the request
    expect(loadingSpy).toHaveBeenCalledWith(false); // Spinner OFF
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });
});
