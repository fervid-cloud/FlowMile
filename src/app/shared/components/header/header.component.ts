import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth-service/auth.service';
import { LocalUser } from '../../model/LocalUser';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {

    localUserInfo!: LocalUser;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.setCurrentUserDetail();
    }

    setCurrentUserDetail(): void {
        this.localUserInfo = this.authService.getLocalUserInfo();
    }

    logOut(): void {
        this.authService.logOut();
    }
}
