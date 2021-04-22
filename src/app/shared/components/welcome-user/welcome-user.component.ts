import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth-service/auth.service';
import { LocalUser } from '../../model/LocalUser';

@Component({
    selector: 'welcome-user',
    templateUrl: './welcome-user.component.html',
    styleUrls: [ './welcome-user.component.css' ]
})
export class WelcomeUserComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    getCurrentUserCompleteName(): string {
        const userInfo: LocalUser = this.authService.getLocalUserInfo();
        return userInfo.firstName + ' ' + userInfo.lastName;
    }

    onRightClick(): boolean {
       return false;
    }
}
