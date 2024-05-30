import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/auth/register/register.component';
import { SignInComponent } from './views/auth/sign-in/sign-in.component';
import { HomePgComponent } from './views/home-pg/home-pg.component';
import { AdvanceFilterComponent } from './views/home-pg/advance-filter/advance-filter.component';
import { FilterComponent } from './views/home-pg/filter/filter.component';

const routes: Routes = [
  { path: "sign-in", component: SignInComponent },
  { path: "register", component: RegisterComponent },

  {
    path: "",
    component: HomePgComponent,
    children: [
      { path: "advance-filter", component: AdvanceFilterComponent },
      { path: "filter", component: FilterComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
