import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import { UserManagerService } from '../../../core/services/user-manager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  hide = true;
  errorMessage!: string;
  returnUrl!: string;

  constructor(
    private httpService: HttpService,
    private userManager: UserManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onAuthSubmit(form: NgForm) {
    const authValue = form.value;
    console.log(authValue);

    this.httpService.auth(authValue).subscribe(
      response => {
        console.log('Authentication successful:', response);
        this.userManager.saveUserToken(response.jwt);
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        console.error('Authentication failed:', error);
        this.errorMessage = 'Authentication failed. Please check your credentials.';
      }
    );
  }
}