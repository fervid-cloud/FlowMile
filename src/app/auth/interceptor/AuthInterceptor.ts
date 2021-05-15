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
        private authService: AuthService,
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
        const authToken = this.authService.getAuthorizationToken();
        if (!authToken || req.url.includes('login') || req.url.includes('register')) {
            const withoutTokenResponse: Observable<HttpEvent<any>> = next.handle(req);
            return withoutTokenResponse.pipe(catchError((error) => {
                return this.handleError(error, req);
            }));
        }

        console.log('The authToken is : ', authToken);

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}`}} );
        // send cloned request with header to the next handler.
        const response: Observable<HttpEvent<any>> = next.handle(authReq);
        console.log("old this is : ", this);

        return response.pipe(catchError((error) => {
            return this.handleError(error, req);
        }));

        // return response;
    }


    private handleError(error: HttpErrorResponse, req: HttpRequest<any>): Observable<any>{


        console.log("this is : ", this);
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response dashboard-body may contain clues as to what went wrong.
            console.error(`Backend returned code`, error.status);
            console.error(`body was:`, error.error);
        }

        /*
        https://stackoverflow.com/questions/41354553/how-to-handle-neterr-connection-refused-in-angular2#:~:text=Angular%20is%20a%20Javascript%20Framework,find%20out%20what%200%20means.&text=So%2C%20ERR_CONNECTION_REFUSED%20means%20the%20connection,to%20Connect%20to%20the%20Server%22.
        So, ERR_CONNECTION_REFUSED means the connection is not established (request is not completed),
        and therefore, the status code is 0. In that case it's safe to say "Unable to Connect to the Server"
        */
        if(req.url.includes("/user") || (error.status == 0)) {
            this.showErrorToUser(error);
        }
        // Return an observable with a user-facing error message.
        // return throwError('Something bad happened; please try again later.');
        throw error;
    }

    private showErrorToUser(error: HttpErrorResponse) {

        let messageTitle = "Error";
        let messageText = "An error occurred";
        switch(error.status) {
            case 401:
                messageTitle = "UnAuthorized";
                messageText = "You are unauthorized";
                break;
            case 403:
                messageTitle = "Forbidden";
                messageText = "You are forbidden";
                break;
            case 404:
                messageTitle = "Not Found";
                messageText = "Not found";
                break;
            case 504:
                messageTitle = "Server error";
                messageText = "Interval server error";
                break;
            case 400:
                messageTitle = "Bad request";
                messageText = "Invalid request";
                break;
            case 0:
                messageTitle = "Service unavailable";
                messageText = "Unable to Connect to the Server";
        }

        this.toastrService.error(messageText, messageTitle, {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            onActivateTick: true
        });
    }
}
