import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { UserCreateUpdateComponent } from './components/user-create-update/user-create-update.component';
import { DeviceCreateUpdateComponent } from './components/device-create-update/device-create-update.component';
import { DeviceoutputCreateUpdateComponent } from './components/deviceoutput-create-update/deviceoutput-create-update.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ChartsModule } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TableComponent,
    SidenavComponent,
    UserCreateUpdateComponent,
    DeviceCreateUpdateComponent,
    DeviceoutputCreateUpdateComponent,
    UserDetailsComponent,
    AdminPageComponent
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
    MatDialogModule
  ],
  entryComponents: [ UserCreateUpdateComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
