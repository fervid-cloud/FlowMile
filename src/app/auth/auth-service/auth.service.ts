import { Injectable } from '@angular/core';
import { LocalUser } from 'src/app/shared/model/LocalUser';
import { ResponseModel } from 'src/app/shared/utility/response-model/response-model';
import { environment } from 'src/environments/environment';
import { UserLoginDto } from '../dto/request/user-login-dto';
import { UserAuthenticatedResponseDto } from '../dto/response/UserAuthenticatedResponseDto';
import { Local } from 'protractor/built/driverProviders';
import { HttpClient } from '@angular/common/http';
import { RequestMethod } from '../enum/request-method-enum';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    backendSocket: string = environment.backendSocket;

    accessToken!: string | null;

    isLoggedIn = false;

    localUserDetail!: LocalUser | null;

    constructor(
        private httpClient: HttpClient
    ) {
        this.getStoredData();
    }

    getStoredData(): void {
        const localStorage: Storage = window.localStorage;
        this.accessToken = localStorage.getItem('accessToken');
        this.localUserDetail = JSON.parse(localStorage.getItem('userDetail') as string);
        console.log('The access token is : ', this.accessToken);
        console.log('The User Detail is :', this.localUserDetail);
    }

    async responseCheck(response: Response) {
        const responseObject = (await response.json()) as ResponseModel;

        if (!response.ok) {
            throw new Error(responseObject.message);
        }
        return responseObject;
    }


    async logIn(userLoginDto: UserLoginDto): Promise<boolean> {

        try {
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
            return false;
        }

    }

    storeRequiredData(): void {
        if (typeof this.accessToken === 'string') {
            window.localStorage.setItem('accessToken', this.accessToken);
        }
        window.localStorage.setItem('userDetail', JSON.stringify(this.localUserDetail));
    }

    logOut(): void {

    }

    getAuthorizationToken(): string {
        console.log('the token is :');
        return this.accessToken as string;
    }

}
