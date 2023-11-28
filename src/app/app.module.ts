import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DragDropModule } from 'primeng/dragdrop';
import { NgToastModule } from 'ng-angular-popup';
import { ToastModule } from 'primeng/toast';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { BookingItemComponent } from './components/booking-item/booking-item.component';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { TokenInterceptor } from './services/token.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { NewLoginComponent } from './components/new-login/new-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingsComponent,
    AddBookingComponent,
    BookingItemComponent,
    ButtonComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    CreateBookingComponent,
    SignupComponent,
    NewLoginComponent,
    DashboardComponent
  
    
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ChipModule,
    DragDropModule,
    NgToastModule,
    ToastModule
  
    
  ],
  providers: [{
    
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    //useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
