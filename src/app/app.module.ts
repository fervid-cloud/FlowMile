import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './shared/components/body/body.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainContentComponent } from './shared/components/main-content/main-content.component';
import { NotFoundComponent } from './shared/components/error-handling/not-found/not-found.component';
import { InternalServerErrorComponent } from './shared/components/error-handling/internal-server-error/internal-server-error.component';
import { ToDoComponent } from './features/to-do/components/to-do.component';
import { ToDoBoxComponent } from './features/to-do/components/to-do-box/to-do-box.component';
import { CreateToDoComponent } from './features/to-do/components/create-to-do/create-to-do.component';
import { ToDoDetailComponent } from './features/to-do/components/to-do-detail/to-do-detail.component';
import { ToDoListComponent } from './features/to-do/components/to-do-list/to-do-list.component';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        BodyComponent,
        SidebarComponent,
        MainContentComponent,
        NotFoundComponent,
        InternalServerErrorComponent,
        ToDoComponent,
        ToDoBoxComponent,
        CreateToDoComponent,
        ToDoDetailComponent,
        ToDoListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
