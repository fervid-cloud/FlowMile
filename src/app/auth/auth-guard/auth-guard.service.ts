import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    /*  Note: The canActivate guard still allows the component for a given route to be activated (but not navigated to).
      If we wanted to prevent activation altogether, we could use the canLoad guard.*/
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.log("checking if route can be activated");
        const authenticatedStatus: boolean = await this.authService.isAuthenticated();
        console.log("the status of user authentication is : ", authenticatedStatus);
        if (!authenticatedStatus) {
            await this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
