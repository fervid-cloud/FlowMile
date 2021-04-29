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
import { UserRegistrationDto } from '../dto/request/user-registration-dto';
import { EditUserInfoDto } from '../dto/request/edit-user-info-dto';
import { ChangePasswordDto } from '../dto/request/change-password-dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {
        this.getStoredData();
    }

    static TOKEN = "token";

    backendSocket: string = environment.backendSocket;

    token!: string | null | undefined;

    localUserDetail!: LocalUser | null | undefined;

    async getStoredData(): Promise<void> {
        try {
            console.log("getting token from the storage");
            this.token = window.localStorage.getItem(AuthService.TOKEN);
            if(!this.token) {
               throw new Error("Token doesn't exists");
            }
        } catch (ex) {
            console.log("some error occurred while retrieving the user detail");
            console.log(ex);
            this.logOut();
        } finally {
            console.log('The token is : ', this.token);
            console.log('The User Detail is :', this.localUserDetail);
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
            const loginResponse =  await this.httpClient.request(RequestMethod.POST, this.backendSocket + '/api/account/login', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json',
                body: JSON.stringify(userLoginDto)
            }).toPromise() as ResponseModel;

            const authenticationResponse: UserAuthenticatedResponseDto  = (loginResponse.data as UserAuthenticatedResponseDto);
            this.token = authenticationResponse.token;
            this.storeRequiredData();
            await this.getStoredData();

            return true;
        } catch (ex) {

            console.log("exception was : ", ex);
            return false;
        }

    }

    async isAuthenticated(): Promise<boolean> {
        if (!this.token) {
            return false;
        }
        console.log("token taken from storage is : ", this.token);
        if (!this.localUserDetail) {
            console.log("no userdetail exist, so updating user");
            try {
                this.localUserDetail = await this.getUpdatedUserInfo(this.token);
                console.log("updated localUserDetail: ", this.localUserDetail);
            } catch(ex){
                console.log("could not connect to the internet");
                this.router.navigate(["/unavailable"]);
            }
        }

        return !AuthService.isTokenExpired(this.token);
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
        if (typeof this.token === 'string') {
            window.localStorage.setItem(AuthService.TOKEN, this.token);
        }
        // future steps use https://www.npmjs.com/package/lzutf8
        // then use https://www.npmjs.com/package/cryptr
    }

    logOut(): void {
        this.clearUserData();
        this.router.navigateByUrl("/login");
    }

    clearUserData() {
        this.token = null;
        this.localUserDetail = null;
        window.localStorage.removeItem(AuthService.TOKEN);
        window.localStorage.clear();
    }

    getAuthorizationToken(): string {
        console.log('the token is :');
        return this.token as string;
    }

    getLocalUserInfo(): LocalUser {
        return this.localUserDetail as LocalUser;
    }

    private async getUpdatedUserInfo(token: string) {
        const decodedPayLoad = jwt_decode<JwtPayload>(token);
        const username =  decodedPayLoad.sub;
        console.log("subject from jwt is : ", username);
        const updatedUserInfo: LocalUser = ( await this.httpClient.request(RequestMethod.GET, this.backendSocket + `/api/account/userInfo/${username}`).toPromise() as ResponseModel).data;
        console.log("updatedUserInfo is : ", updatedUserInfo);
        return updatedUserInfo;
    }


    async registerUser(userRegistrationDto: UserRegistrationDto): Promise<boolean> {
        return true;
    }

    async editUserInfo(editUserInfo: EditUserInfoDto): Promise<LocalUser> {
        return new LocalUser();
    }


    async changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean> {
        return true;
    }

     static isTokenExpired(currentToken: string): boolean {
        try {
            const decodedPayLoad = jwt_decode<JwtPayload>(currentToken);
            const expiryTime = decodedPayLoad.exp;
            // !! converts into variable value into a truth or falsy value
            return !!expiryTime && (expiryTime >= Date.now());
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}
