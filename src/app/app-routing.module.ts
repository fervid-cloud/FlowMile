import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { InternalServerErrorComponent } from './shared/components/error-handling/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './shared/components/error-handling/not-found/not-found.component';
import { SingleCategoryComponent } from './features/to-do/components/single-category/single-category.component';
import { ToDoListComponent } from './features/to-do/components/to-do-list/to-do-list.component';
import { CreateToDoComponent } from './features/to-do/components/create-to-do/create-to-do.component';
import { ToDoDetailComponent } from './features/to-do/components/to-do-detail/to-do-detail.component';
import { ToDoCategoryComponent } from './features/to-do/components/to-do-category/to-do-category.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CategoryDetailComponent } from './features/to-do/components/category-detail/category-detail.component';

/* What about path: '**' ?
    path : '**' will match absolutely anything(af / frewf / 321532152 / fsa is a match) with or without a pathMatch: 'full'.

        Also, since it matches everything, the root path is also included, which makes { path: '', redirectTo: 'welcome' } completely redundant in this setup.

 */

/* The path - matching strategy, one of 'prefix' or 'full'.Default is 'prefix'.

By default, the router checks URL elements from the left to see if the URL matches a given path, and stops when there is a match.For example, '/team/11/user' matches 'team/:id'.

The path - match strategy 'full' matches against the entire URL.It is important to do this when redirecting empty - path routes.Otherwise, because an empty path is a prefix of any URL, the router would apply the redirect even when navigating to the redirect destination, creating an endless loop.
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
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        // pathMatch: 'full',
        component: DashboardComponent,
        children: [
            {
                path: 'todo', component: ToDoCategoryComponent, pathMatch: 'full'
            },

            {
                path: 'todo/:categoryId', component: SingleCategoryComponent,
                children: [
                    {
                        path: 'list/:listType', component: ToDoListComponent, pathMatch: 'full',
                    },
                    {
                        path: 'add', component: CreateToDoComponent, pathMatch: 'full',
                    },
                    {
                        path: 'list/:listType/:taskId', component: ToDoDetailComponent, pathMatch: 'full',
                    },
                    {
                        path: '', component: CategoryDetailComponent, pathMatch: 'full'
                    }
                ]
            }

        ]
    }
    ,
    {
        path: 'error', pathMatch: 'full', component: InternalServerErrorComponent
    }
    ,
    {
        path: '**', pathMatch: 'full',component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
