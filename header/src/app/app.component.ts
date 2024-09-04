import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'header';
  name = sessionStorage.getItem('name');

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')!;
  }

  constructor() {
    this.name = sessionStorage.getItem('name')!;
  }

  logout() {
    window.location.href = '/';
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('User');
  }
}
