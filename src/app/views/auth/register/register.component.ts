import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      personalNumber: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Registration form data:', formData);

      this.httpService.register(formData).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/sign-in']);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
