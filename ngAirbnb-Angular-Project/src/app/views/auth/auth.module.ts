import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MaterialModule } from '../../shared/modules/material/material.module';




@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AuthModule { }
