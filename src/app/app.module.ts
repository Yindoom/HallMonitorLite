import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {TableComponent} from './components/table/table.component';
import {UserCreateUpdateComponent} from './components/user-create-update/user-create-update.component';
import {DeviceCreateUpdateComponent} from './components/device-create-update/device-create-update.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {DeviceComponent} from './components/device/device.component';
import {DeviceOutputComponent} from './components/device-output/device-output.component';
import {DeviceOutputCreateUpdateComponent} from './components/device-output-create-update/device-output-create-update.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {PasswordComponent} from './components/password/password.component';

import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {ChartsModule} from 'ng2-charts';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatDialogModule, MatToolbarModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {UserState} from './ngxs/user.state';
import {DeviceOutputState} from './ngxs/device-output.state';
import {DeviceState} from './ngxs/device.state';
import { DeviceOutputTableDetailsComponent } from './components/device-output-table-details/device-output-table-details.component';
import { H401Interceptor } from './services/http-interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TableComponent,
    UserCreateUpdateComponent,
    DeviceCreateUpdateComponent,
    DeviceOutputCreateUpdateComponent,
    UserDetailsComponent,
    AdminPageComponent,
    DeviceComponent,
    DeviceOutputComponent,
    NavbarComponent,
    DeviceOutputTableDetailsComponent,
    PasswordComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PDFExportModule,
    ChartsModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatToolbarModule,
    NgxsModule.forRoot([UserState, DeviceState, DeviceOutputState])
  ],
  entryComponents: [
    UserCreateUpdateComponent,
    DeviceCreateUpdateComponent,
    DeviceOutputCreateUpdateComponent,
    DeviceOutputTableDetailsComponent,
    PasswordComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: H401Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
