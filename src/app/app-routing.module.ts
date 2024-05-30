import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './views/auth/sign-in/sign-in.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { UpdateUserInfoComponent } from './views/auth/update-user-info/update-user-info.component';
import { HomePgComponent } from './views/home-pg/home-pg.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { HotelDetailsComponent } from './views/home-pg/hotel-details/hotel-details.component';
import { ErrorPageComponent } from './views/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomePgComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'update-user-info', component: UpdateUserInfoComponent },
  { path: 'hotel-details/:id', component: HotelDetailsComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
