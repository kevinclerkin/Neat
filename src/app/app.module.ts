import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { BookingItemComponent } from './components/booking-item/booking-item.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingsComponent,
    AddBookingComponent,
    BookingItemComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
