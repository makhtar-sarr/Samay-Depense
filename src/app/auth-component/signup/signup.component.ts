import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MustMatch } from './mustMatch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  success: any;
  err: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      poste: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/api/register', formData).subscribe(
      response => {
        this.success = response;

        if(this.success['success'] == true) {
          Swal.fire({
            title: 'Hourra!!',
            text: this.success['data']['prenom'] + " " + this.success['data']['nom'] + " est enregistre avec succes.",
            icon: 'success',
            confirmButtonColor: "purple",
          });
        }
        this.router.navigate(['/login']);
      },
      error => {
        this.err = error;
        if(this.err['success'] != true) {
          Swal.fire({
            title: 'Oups!!',
            text: "Un compte creer avec cet addresse mail existe deja.",
            icon: 'error',
            confirmButtonColor: "purple"
          });
        }
        console.log(this.err)
      }
    );
  }

}
