import { User } from './../user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  user: any;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    this.http.get('http://localhost:8000/api/dashboard', {headers}).subscribe(
      result => this.user = result,
      error => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    );
  }

  logout(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    this.http.post('http://localhost:8000/api/logout', this.user, {headers}).subscribe(
      result => {
        this.authService.logout();
        this.router.navigate(['/accueil']);
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
}
