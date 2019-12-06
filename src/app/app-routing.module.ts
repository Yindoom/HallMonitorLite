import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {TableComponent} from './components/table/table.component';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {DeviceComponent} from './components/device/device.component';
import {DeviceOutputComponent} from './components/device-output/device-output.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'table', component: TableComponent , canActivate: [AuthGuard]},
  {path: 'user', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: AdminPageComponent, canActivate: [AdminGuard]},
  {path: 'devices', component: DeviceComponent, canActivate: [AdminGuard]},
  {path: 'deviceOutputs', component: DeviceOutputComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
