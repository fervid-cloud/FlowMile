import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChildAuthGuardService implements CanActivateChild {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.log("in child auth guard service");
        console.log('checking if route can be activated');
        const authenticatedStatus: boolean = await this.authService.isAuthenticated();
        console.log('the status of user authentication is : ', authenticatedStatus);
        if (!authenticatedStatus) {
            await this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
