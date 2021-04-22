import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NotFoundComponent } from './shared/components/error-handling/not-found/not-found.component';
import { InternalServerErrorComponent } from './shared/components/error-handling/internal-server-error/internal-server-error.component';
import { ToDoBoxComponent } from './features/to-do/components/to-do-box/to-do-box.component';
import { CreateToDoComponent } from './features/to-do/components/create-to-do/create-to-do.component';
import { ToDoDetailComponent } from './features/to-do/components/to-do-detail/to-do-detail.component';
import { ToDoListComponent } from './features/to-do/components/to-do-list/to-do-list.component';
import { ToDoCategoryComponent } from './features/to-do/components/to-do-category/to-do-category.component';
import { CategoryBoxComponent } from './features/to-do/components/category-box/category-box.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CategoryDetailComponent } from './features/to-do/components/category-detail/category-detail.component';
import { GenericDialogModelComponent } from './shared/utility/components/generic-dialog-model/generic-dialog-model.component';
import { PaginationComponent } from './features/to-do/components/pagination/pagination.component';
import { SingleTaskListComponent } from './features/to-do/components/single-task-list/single-task-list.component';
import { SingleCategoryComponent } from './features/to-do/components/single-category/single-category.component';
import { AuthInterceptor } from './auth/interceptor/AuthInterceptor';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { AuthGuardService } from './auth/auth-guard/auth-guard.service';
import { UserAccountComponent } from './shared/components/user-account/user-account.component';
import { DashboardBodyComponent } from './shared/components/dashboard-body/dashboard-body.component';
import { SettingOptionsComponent } from './shared/setting-options/setting-options.component';
import { DefaultProfileLogoComponent } from './shared/components/default-profile-logo/default-profile-logo.component';
import { ProfileDetailComponent } from './shared/components/profile-detail/profile-detail.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { WelcomeUserComponent } from './shared/components/welcome-user/welcome-user.component';
import { CustomSpinnerComponent } from './shared/components/custom-spinner/custom-spinner.component';
import { TypeWriterWordSimulatorComponent } from './shared/components/type-writer-word-simulator/type-writer-word-simulator.component';



@NgModule({
    declarations: [
        AppComponent,
        UserAccountComponent,
        HeaderComponent,
        DashboardComponent,
        DashboardBodyComponent,
        FooterComponent,
        SidebarComponent,
        NotFoundComponent,
        InternalServerErrorComponent,
        SingleCategoryComponent,
        ToDoBoxComponent,
        CreateToDoComponent,
        ToDoDetailComponent,
        ToDoListComponent,
        ToDoCategoryComponent,
        CategoryBoxComponent,
        LoginComponent,
        SignupComponent,
        CategoryDetailComponent,
        GenericDialogModelComponent,
        PaginationComponent,
        SingleTaskListComponent,
        SettingsComponent,
        SettingOptionsComponent,
        DefaultProfileLogoComponent,
        ProfileDetailComponent,
        ChangePasswordComponent,
        WelcomeUserComponent,
        CustomSpinnerComponent,
        TypeWriterWordSimulatorComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
