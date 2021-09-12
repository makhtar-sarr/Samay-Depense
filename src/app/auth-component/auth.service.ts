import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedChanged = new Subject<boolean>();
  constructor() { }

  login(token: any): void {
    localStorage.setItem('token', token);
    this.loggedChanged.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedChanged.next(false);
  }
  isUserLoggedIn(): Subject<boolean> {
    return this.loggedChanged;
  }
}
