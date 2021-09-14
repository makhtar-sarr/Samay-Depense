import { Depense } from './depense';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public fb: FormBuilder) { }

  getDepense() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/depenses', {headers})
  }

  getCategorieDepense() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get('http://localhost:8000/api/categorie_deps', {headers})
  }

  getSousCategorieDepense() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get('http://localhost:8000/api/sous_categorie_deps', {headers})
  }

  createDepense(form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.post('http://localhost:8000/api/depenses', formData, {headers})
  }

  showDepense(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get(`http://localhost:8000/api/depenses/${id}`, {headers})
  }

  updateDepense(depense: Depense, form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.put(`http://localhost:8000/api/depenses/${depense.id}`, formData, {headers})
  }

  supprimerDepense(depense: Depense) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.delete(`http://localhost:8000/api/depenses/${depense.id}`, {headers})
  }

  getSousCatByCat(catDep: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get(`http://localhost:8000/api/get_sous_cat_by_cat/${catDep}`, {headers})
  }

  getMontantDepTotal() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/montant_total', {headers})
  }

  getSoldeRestant() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/solde_restant', {headers})
  }

  getChartDataByDay() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/chart_day', {headers})
  }

  getChartDataByMonth() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/chart_month', {headers})
  }

  getChartPie() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/chart_pie', {headers})
  }
}
