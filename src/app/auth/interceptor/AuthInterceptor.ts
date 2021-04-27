import { Inject, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../shared/utility/util-service/util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    backendSocket: string = environment.backendSocket;
    constructor(
        @Inject (Injector) private readonly injector: Injector,
        private auth: AuthService,
        private toastrService: ToastrService
    ) {
    }


/*
    we first start by retrieving the JWT string from Local Storage directly
    then we are going to check if the JWT is present
    if the JWT is not present, then the request goes through to the server unmodified
    if the JWT is present, then we will clone the HTTP headers, and add an extra Authorization header, which will contain the JWT
    And with this in place, the JWT that was initially created on the Authentication server, is now being sent with each request to the Application server.
*/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*        if (req.url.includes(this.backendSocket + '/api/login/userLogin')) {
            next.handle(req);
        }*/

        // Get the auth token from the service.
        const authToken = this.auth.getAuthorizationToken();
        if (!authToken) {
            const withoutTokenResponse: Observable<HttpEvent<any>> = next.handle(req);
            return withoutTokenResponse.pipe(catchError(this.handleError)) ;
        }
        console.log('The authToken is : ', authToken);

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}`}} );
        // send cloned request with header to the next handler.
        const response: Observable<HttpEvent<any>> = next.handle(authReq);
        console.log("old this is : ", this);
        return response.pipe(catchError(this.handleError.bind(this))) ;

        // return response;
    }


    private handleError(error: HttpErrorResponse): Observable<any>{
        console.log("this is : ", this);
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            if(error.status >= 400 && error.status < 500) {
                console.log("invalid request");
            }
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response dashboard-body may contain clues as to what went wrong.
            console.error(`Backend returned code`, error.status);
            console.error(`body was:`, error.error);
        }

        console.error("The error object is: ", error);
        this.toastrService.error("An error occurred", "Error", {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            onActivateTick: true
        });

        // Return an observable with a user-facing error message.
        // return throwError('Something bad happened; please try again later.');
        return of(error);
    }
}
