import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// ui
import { NavbarComponent } from './components/ui/navbar/navbar.component';
// home
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { TimesheetTableComponent } from './components/home/timesheet-table/timesheet-table.component';
import { TimesheetProjectComponent } from './components/home/timesheet-project/timesheet-project.component';
import { TimesheetTaskComponent } from './components/home/timesheet-task/timesheet-task.component';
// dashboard
import { DashboardPageComponent } from './components/dashboard/dashboard-page/dashboard-page.component';
// user login
import { LoginPageComponent } from './components/user/login-page/login-page.component';
import { UserModule } from './modules/user/user.module';

@NgModule({
    declarations: [
        AppComponent,
        // ui
        NavbarComponent,
        // home
        HomePageComponent,
        TimesheetTableComponent,
        TimesheetProjectComponent,
        TimesheetTaskComponent,
        // dashboard
        DashboardPageComponent,
        // user login
        LoginPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        NgbModule,
        ReactiveFormsModule,
        DragDropModule,
        UserModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
