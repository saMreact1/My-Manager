import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(
        () => {
          this.loader.isLoading.next(false);
        }
      )
    )
  }
}