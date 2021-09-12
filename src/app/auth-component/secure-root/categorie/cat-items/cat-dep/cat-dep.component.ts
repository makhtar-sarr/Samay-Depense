import { Router } from '@angular/router';
import { AuthService } from './../../../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat-dep',
  templateUrl: './cat-dep.component.html',
  styleUrls: ['./cat-dep.component.css']
})
export class CatDepComponent implements OnInit {

  user: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    this.http.get('http://localhost:8000/api/categorie_deps', {headers}).subscribe(
      result => this.user = result,
      error => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    );
  }

}
