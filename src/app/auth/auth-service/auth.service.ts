import { Injectable } from '@angular/core';
import { LocalUser } from 'src/app/shared/model/LocalUser';
import { ResponseModel } from 'src/app/shared/utility/response-model/response-model';
import { environment } from 'src/environments/environment';
import { UserLoginDto } from '../dto/request/user-login-dto';
import { UserAuthenticatedResponseDto } from '../dto/response/UserAuthenticatedResponseDto';
import { HttpClient } from '@angular/common/http';
import { RequestMethod } from '../enum/request-method-enum';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    static ACCESS_TOKEN = "accessToken";

    static USER_DETAIL = "userDetail";

    backendSocket: string = environment.backendSocket;

    accessToken!: string | null;

    localUserDetail!: LocalUser | null;

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {
        this.getStoredData();
    }

    getStoredData(): void {
        try {
            this.accessToken = window.localStorage.getItem(AuthService.ACCESS_TOKEN);
            this.localUserDetail = JSON.parse(window.localStorage.getItem(AuthService.USER_DETAIL) as string);

            console.log('The access token is : ', this.accessToken);
            console.log('The User Detail is :', this.localUserDetail);
        } catch (ex) {
            console.log("some error occurred while retrieving the user detail");
            console.log(ex);
        }
    }

    async responseCheck(response: Response): Promise<any> {
        const responseObject = (await response.json()) as ResponseModel;

        if (!response.ok) {
            throw new Error(responseObject.message);
        }
        return responseObject;
    }


    async logIn(userLoginDto: UserLoginDto): Promise<boolean> {

        try {
            console.log("log in request initiating");
            const loginResponse =  await this.httpClient.request(RequestMethod.POST, this.backendSocket + '/api/login/userLogin', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json',
                body: JSON.stringify(userLoginDto)
            }).toPromise() as ResponseModel;

            const authenticationResponse: UserAuthenticatedResponseDto  = (loginResponse.data as UserAuthenticatedResponseDto);
            this.accessToken = authenticationResponse.accessToken;
            this.localUserDetail = authenticationResponse.userDetailDto;
            this.storeRequiredData();

            return true;
        } catch (ex) {
            console.log("exception was : ", ex);
            return false;
        }

    }

    isAuthenticated(): boolean {
        if (!this.accessToken || !this.localUserDetail) {
            return false;
        }
        return !AuthService.isTokenExpired(this.accessToken);
    }


    /**
     * https://stackoverflow.com/questions/58774476/for-angular-applications-where-should-i-store-the-jwt-tokens-those-are-generated
     * In short, it's OK to store token in Local Storage.
     * Why? You need to understand XXS (cross-site scripting) attacks. Local Storage is only accessible to JavaScript
     * code that runs on your domain. An XXS attack happens when malicious JavaScript code gets on to your site, and
     * steal your token from local storage. Where can these malicious code come from? Source 1: CDN and third party
     * libraries. Don't use sketchy third party code and you will be fine. Source 2: Hackers post malicious code on
     * your site using <script> tag. You don't have to worry about this, since Angular ignore all <script> tag.
     * You probably heard of XSRF/CSRF(Cross-Site Request Forgery) attack. Only worry about this when you use cookies
     * to store token. It happens when the hacker sends user a post request link of your site, and the user click on it.
     * Since the browser always send the cookies that are in the same domain, the hackers post request get authenticated.
     */
    storeRequiredData(): void {
        if (typeof this.accessToken === 'string') {
            window.localStorage.setItem(AuthService.ACCESS_TOKEN, this.accessToken);
        }
        window.localStorage.setItem(AuthService.USER_DETAIL, JSON.stringify(this.localUserDetail));

        // future steps use https://www.npmjs.com/package/lzutf8
        // then use https://www.npmjs.com/package/cryptr
    }

    logOut(): void {
        window.localStorage.removeItem(AuthService.ACCESS_TOKEN);
        window.localStorage.clear();
        this.router.navigateByUrl("/login");
    }

    getAuthorizationToken(): string {
        console.log('the token is :');
        return this.accessToken as string;
    }

    getLocalUserInfo(): LocalUser {
        return this.localUserDetail as LocalUser;
    }

     static isTokenExpired(currentToken: string): boolean {
        try {
            const decodedPayLoad = jwt_decode<JwtPayload>(currentToken);
            const expiryTime = decodedPayLoad.exp;
            // !! converts into variable value into a truth or falsy value
            return !!expiryTime && (expiryTime > Date.now());
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}
