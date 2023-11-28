import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import {NewLoginComponent} from './components/new-login/new-login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: CreateBookingComponent},
  {path: 'register', component: SignupComponent},
  {path: 'login', component: NewLoginComponent},
  {path: 'bookings', component: BookingsComponent},
  {path: 'admin', component: DashboardComponent},
  {path:'calendar', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
