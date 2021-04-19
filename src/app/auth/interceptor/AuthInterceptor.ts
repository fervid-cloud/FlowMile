import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    backendSocket: string = environment.backendSocket;
    constructor(private auth: AuthService) {
    }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes(this.backendSocket + '/api/login/userLogin')) {
            next.handle(req);
        }

        if (req.url.includes(this.backendSocket + '/api/register/newRegister')) {
            next.handle(req);
        }

        // Get the auth token from the service.
        const authToken = this.auth.getAuthorizationToken();
        console.log('The authToken is : ', authToken);

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}`}} );
        // authReq.headers.set('Authorization', authToken);
        // authReq.headers.append('Authorization', authToken);
        console.log('the new request is -------------------- ', authReq);
        // send cloned request with header to the next handler.
        const response: Observable<HttpEvent<any>> = next.handle(authReq);
        return response.pipe(catchError(this.handleError)) ;

        // return response;
    }

    private handleError(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code`, error.status);
            console.error(`body was:`, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }
}