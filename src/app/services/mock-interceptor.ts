import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';

//TODO - mock here
@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(environment.useMocks) {
      //console.log(req);
    }
    return next.handle(req).pipe(
      map((resp) =>  resp)
    );
  }
  
}