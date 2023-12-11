import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmPayComponent } from './components/confirm-pay/confirm-pay.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AvailabilitiesComponent } from './components/availabilities/availabilities.component';
import { TeamComponent } from './components/team/team.component';
import { ServiceComponent } from './components/service/service.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: CreateBookingComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'confirm-pay', component: ConfirmPayComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'bookings', component: BookingsComponent},
  {path:'availabilities', component: AvailabilitiesComponent},
  {path:'team', component: TeamComponent},
  {path: 'services', component: ServiceComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
