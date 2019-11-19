import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import {UserComponent} from './components/user/user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TableComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'user', component: UserDetailsComponent },
  { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
