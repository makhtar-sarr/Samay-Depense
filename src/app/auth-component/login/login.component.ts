import  Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  err: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    const formData = this.form.getRawValue();

    this.http.post('http://localhost:8000/api/login', formData).subscribe(
      (result: any) => {
        // localStorage.setItem('token', result.access_token);
        this.authService.login(result.data.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.err = error
        if(this.err['success'] != true) {
          Swal.fire({
            title: 'Oups!!',
            text: "E-mail ou mot de passe invalide.",
            icon: 'error',
            confirmButtonColor: "purple",
          });
        }
        console.log(error);
      }
    );
  }
}
