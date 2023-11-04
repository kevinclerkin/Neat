import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { BookingItemComponent } from './components/booking-item/booking-item.component';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegLoginComponent } from './components/reg-login/reg-login.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingsComponent,
    AddBookingComponent,
    BookingItemComponent,
    ButtonComponent,
    NavbarComponent,
    RegLoginComponent,
    HomeComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
