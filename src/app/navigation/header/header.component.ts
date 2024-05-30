import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'

})
export class HeaderComponent {
  [x: string]: any;

  constructor(private router: Router) { }

  goTo(pageIndex: number) {
    switch (pageIndex) {
      case 1:
        this.router.navigate(['/register'])
        break;
      case 2:
        this.router.navigate(['/sign-in'])
        break;
      default:
    }

  }
}