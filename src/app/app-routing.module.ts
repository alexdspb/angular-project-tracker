import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { DashboardPageComponent } from './components/dashboard/dashboard-page/dashboard-page.component';
import { ProjectPageComponent } from './components/project/project-page/project-page.component';
import {TaskPageComponent} from './components/task/task-page/task-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'projects/:id', component: ProjectPageComponent},
  {path: 'tasks/:id', component: TaskPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
