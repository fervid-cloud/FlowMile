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
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
