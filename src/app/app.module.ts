import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// user
import { UserModule } from './modules/user/user.module';
// ui
import { NavbarComponent } from './components/ui/navbar/navbar.component';
// home
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { TimesheetTableComponent } from './components/home/timesheet-table/timesheet-table.component';
import { TimesheetProjectComponent } from './components/home/timesheet-project/timesheet-project.component';
import { TimesheetTaskComponent } from './components/home/timesheet-task/timesheet-task.component';
// dashboard
import { DashboardPageComponent } from './components/dashboard/dashboard-page/dashboard-page.component';
import { ProjectPageComponent } from './components/project/project-page/project-page.component';
import { ProjectTeamComponent } from './components/project/project-team/project-team.component';
import { ProjectModalComponent } from './components/project/project-modal/project-modal.component';
import { TaskPageComponent } from './components/task/task-page/task-page.component';
import { TaskModalComponent } from './components/task/task-modal/task-modal.component';

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
        ProjectPageComponent,
        ProjectTeamComponent,
        ProjectModalComponent,
        TaskPageComponent,
        TaskModalComponent,
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
    entryComponents: [
        ProjectModalComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
