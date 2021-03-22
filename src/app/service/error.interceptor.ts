import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        //location.reload();
      } else {
        //this.messageService.add({severity: 'error', summary: 'Error Message', detail: err.message});
        this.router.navigateByUrl('/');
        console.log(err.message);
      }
      //const error = err.error.message || err.statusText;
      return throwError(err);
    }));
  }
}
