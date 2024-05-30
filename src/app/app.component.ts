import { Component, OnInit } from '@angular/core';
import { HttpService } from './core/services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  offsers: any[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.read().subscribe(response => {
      this.offsers = response
  });
  }
}
