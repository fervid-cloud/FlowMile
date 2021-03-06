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
import { CreateTaskComponent } from './features/to-do/components/create-task/create-task.component';
import { TaskDetailComponent } from './features/to-do/components/task-detail/task-detail.component';
import { TaskListComponent } from './features/to-do/components/task-list/task-list.component';
import { ToDoCategoryComponent } from './features/to-do/components/to-do-category/to-do-category.component';
import { CategoryBoxComponent } from './features/to-do/components/category-box/category-box.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CategoryDetailComponent } from './features/to-do/components/category-detail/category-detail.component';
import { GenericDialogModelComponent } from './shared/utility/components/generic-dialog-model/generic-dialog-model.component';
import { PaginationComponent } from './features/to-do/components/pagination/pagination.component';
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
import { AnimatedSearchInputComponent } from './shared/components/animated-search-input/animated-search-input.component';
import { CustomFilterDropdownComponent } from './shared/components/custom-filter-dropdown/custom-filter-dropdown.component';
import { ToastrModule } from 'ngx-toastr';
import { UtilService } from './shared/utility/util-service/util.service';
import { ServiceUnavailableComponent } from './shared/components/error-handling/service-unavailable/service-unavailable.component';

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
        CreateTaskComponent,
        TaskDetailComponent,
        TaskListComponent,
        ToDoCategoryComponent,
        CategoryBoxComponent,
        LoginComponent,
        SignupComponent,
        CategoryDetailComponent,
        GenericDialogModelComponent,
        PaginationComponent,
        SettingsComponent,
        SettingOptionsComponent,
        DefaultProfileLogoComponent,
        ProfileDetailComponent,
        ChangePasswordComponent,
        WelcomeUserComponent,
        CustomSpinnerComponent,
        TypeWriterWordSimulatorComponent,
        AnimatedSearchInputComponent,
        CustomFilterDropdownComponent,
        ServiceUnavailableComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            // preventDuplicates: true
        })

    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        AuthGuardService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
