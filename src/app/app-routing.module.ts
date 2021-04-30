import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { InternalServerErrorComponent } from './shared/components/error-handling/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './shared/components/error-handling/not-found/not-found.component';
import { SingleCategoryComponent } from './features/to-do/components/single-category/single-category.component';
import { TaskListComponent } from './features/to-do/components/task-list/task-list.component';
import { CreateTaskComponent } from './features/to-do/components/create-task/create-task.component';
import { TaskDetailComponent } from './features/to-do/components/task-detail/task-detail.component';
import { ToDoCategoryComponent } from './features/to-do/components/to-do-category/to-do-category.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { AuthGuardService } from './auth/auth-guard/auth-guard.service';
import { UserAccountComponent } from './shared/components/user-account/user-account.component';
import { ProfileDetailComponent } from './shared/components/profile-detail/profile-detail.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { WelcomeUserComponent } from './shared/components/welcome-user/welcome-user.component';
import { ChildAuthGuardService } from './auth/child-auth-guard/child-auth-guard.service';
import { ServiceUnavailableComponent } from './shared/components/error-handling/service-unavailable/service-unavailable.component';

/* What about path: '**' ?
    path : '**' will match absolutely anything(af / frewf / 321532152 / fsa is a match) with or without a pathMatch: 'full'.

        Also, since it matches everything, the root path is also included, which makes { path: '', redirectTo: 'welcome' } completely redundant in this setup.

 */

/* The path - matching strategy, one of 'prefix' or 'full'.Default is 'prefix'.

By default, the router checks URL elements from the left to see if the URL matches a given path, and stops when
there is a match.For example, '/team/11/user' matches 'team/:id'.

The path - match strategy 'full' matches against the entire URL.It is important to do this when redirecting empty -
 path routes.Otherwise, because an empty path is a prefix of any URL, the router would apply the redirect even when
 navigating to the redirect destination, creating an endless loop.
 */

/*

Route order
The order of routes is important because the Router uses a first-match wins strategy when matching routes,
so more specific routes should be placed above less specific routes. List routes with a static path first,
followed by an empty path route, which matches the default route. The wildcard route comes last because it
matches every URL and the Router selects it only if no other routes match first.




Notice that the wildcard route is placed at the end of the array.The order of your routes is important, as
Angular applies routes in order and uses the first match it finds.

Try navigating to a non-existing route on your application, such as http://localhost:4200/powers. This
route doesn't match anything defined in your app.module.ts file. However, because you defined a wildcard
route, the application automatically displays your NotFoundComponent component.

*/

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'signin',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: SignupComponent,
        pathMatch: 'full'
    },
    {
        path: 'user',
        component: UserAccountComponent,
        canActivate: [ AuthGuardService ],
        canActivateChild: [ChildAuthGuardService],
        children: [
            {
                path: 'dashboard',
                // pathMatch: 'full',
                component: DashboardComponent,
                children: [
                    {
                      path: '', component: WelcomeUserComponent, pathMatch: 'full'
                    },
                    {
                        path: 'todo', component: ToDoCategoryComponent, pathMatch: 'full'
                    },

                    {
                        path: 'todo/:categoryId', component: SingleCategoryComponent,
                        children: [
                            {
                                path: 'list/:listType', component: TaskListComponent, pathMatch: 'full',
                            },
                            {
                                path: 'add', component: CreateTaskComponent, pathMatch: 'full',
                            },
                            {
                                path: ':taskId', component: TaskDetailComponent, pathMatch: 'full',
                            }
                            /*  ,
                             {
                                 path: '', component: CategoryDetailComponent, pathMatch: 'full'
                             } */
                        ]
                    }

                ]
            },
            {
                path: 'settings',
                component: SettingsComponent,
                children: [
                    {
                        path: 'profile',
                        component: ProfileDetailComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: 'change-password',
                        component: ChangePasswordComponent,
                        pathMatch: 'full'
                    }
                ]
            }
        ]
    },
    {
        path: 'error', pathMatch: 'full', component: InternalServerErrorComponent
    }
    ,
    {
        path: 'unavailable', pathMatch: 'full', component: ServiceUnavailableComponent
    }
    ,
    {
        path: 'not-found', pathMatch: 'full', component: NotFoundComponent
    }
    ,
    {
        path: '', pathMatch: 'full', redirectTo: '/user/dashboard'
    }
    ,
    {
        path: '**', pathMatch: 'full', component: NotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
