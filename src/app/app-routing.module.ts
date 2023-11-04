import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegLoginComponent } from './components/reg-login/reg-login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegLoginComponent},
  {path: 'login', component: RegLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
