import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {TableComponent} from './components/table/table.component';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {DeviceComponent} from './components/device/device.component';
import {DeviceOutputComponent} from './components/device-output/device-output.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'table', component: TableComponent},
  {path: 'user', component: UserDetailsComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'devices', component: DeviceComponent},
  {path: 'deviceOutputs', component: DeviceOutputComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
