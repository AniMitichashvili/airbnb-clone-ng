import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {
  hide = true;
  updateUserInfoForm!: FormGroup;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateUserInfoForm = this.formBuilder.group({
      userName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      phone: ['', Validators.required],
      personalNumber: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.userData = this.httpService.getLogInUserData();
    this.updateFormValues();
  }

  private updateFormValues() {
    if (this.userData) {
      this.updateUserInfoForm.patchValue({
        userName: this.userData['unique_name'],
        email: this.userData['email'],
        surname: this.userData['surname']
      });
    }
  }

  onUpdateInfoFormSubmit() {
    if (this.updateUserInfoForm.valid) {
      const data = this.updateUserInfoForm.value;
      data.id = this.userData["id"];

      this.httpService.updateUserInfo(data).subscribe(
        response => {
          console.log('User info updated successfully:', response);
          localStorage['token'] = response['jwt'];
          this.userData = this.httpService.getLogInUserData();
          this.updateFormValues();
          this.router.navigate(['/profile']);
        },
        error => {
          console.error('Error updating user info:', error);
        }
      );
    }
  }
}