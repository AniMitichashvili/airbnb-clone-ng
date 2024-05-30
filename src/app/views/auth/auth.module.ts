import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent,
    UpdateUserInfoComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class AuthModule {  }
