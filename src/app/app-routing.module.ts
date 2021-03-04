import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InternalServerErrorComponent } from './components/error-handling/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './components/error-handling/not-found/not-found.component';

/* What about path: '**' ?
    path : '**' will match absolutely anything(af / frewf / 321532152 / fsa is a match) with or without a pathMatch: 'full'.

        Also, since it matches everything, the root path is also included, which makes { path: '', redirectTo: 'welcome' } completely redundant in this setup.

 */

/* The path - matching strategy, one of 'prefix' or 'full'.Default is 'prefix'.

By default, the router checks URL elements from the left to see if the URL matches a given path, and stops when there is a match.For example, '/team/11/user' matches 'team/:id'.

The path - match strategy 'full' matches against the entire URL.It is important to do this when redirecting empty - path routes.Otherwise, because an empty path is a prefix of any URL, the router would apply the redirect even when navigating to the redirect destination, creating an endless loop.
 */

const routes: Routes = [
    {
        path: 'dashboard', pathMatch: 'full', component: DashboardComponent
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
