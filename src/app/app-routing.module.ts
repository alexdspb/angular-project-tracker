import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { DashboardPageComponent } from './components/dashboard/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './modules/user/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'user/login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
