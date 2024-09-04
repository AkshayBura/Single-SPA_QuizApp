declare var google: any;
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isDisabled: boolean = true;
  @ViewChild('name') nameKey!: ElementRef;

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '320134819267-75ca1tr8ia1sck4ehis8224g87pnieif.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      text: 'continue_with',
      shape: 'circle',
      width: 250,
    });
  }

  constructor(private route: Router) {}

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  startQuiz() {
    sessionStorage.setItem('name', this.nameKey.nativeElement.value);
    window.location.href = '/questions';
    }

  handleLogin(resp: any) {
    const payload = this.decodeToken(resp.credential);
    sessionStorage.setItem('User', JSON.stringify(payload));
    sessionStorage.setItem('name', payload.name);
    // this.route.navigate(['/questions']);
    window.location.href = '/questions';
  }
}
