import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import{ ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmPayComponent } from './components/confirm-pay/confirm-pay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChartComponent } from './components/chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AvailabilitiesComponent } from './components/availabilities/availabilities.component';
import { TeamComponent } from './components/team/team.component';
import { MatDialogModule } from '@angular/material/dialog';
import  {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { ServiceComponent } from './components/service/service.component';
import { AddServiceDialogComponent } from './components/add-service-dialog/add-service-dialog.component';
import { EditServiceDialogComponent } from './components/edit-service-dialog/edit-service-dialog.component';
import { AddAvailabilityDialogComponent } from './components/add-availability-dialog/add-availability-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateBookingComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ConfirmPayComponent,
    SidebarComponent,
    ChartComponent,
    BookingsComponent,
    AvailabilitiesComponent,
    TeamComponent,
    ServiceComponent,
    AddServiceDialogComponent,
    EditServiceDialogComponent,
    AddAvailabilityDialogComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    TimepickerModule,
    NgxMaterialTimepickerModule,
    CalendarModule,
    
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    //useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
