import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }
  //   ngOnInit(): void{}
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

}
