import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegLoginComponent } from './components/reg-login/reg-login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: AppComponent},
  {path: 'register', component: RegLoginComponent},
  {path: 'login', component: RegLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
