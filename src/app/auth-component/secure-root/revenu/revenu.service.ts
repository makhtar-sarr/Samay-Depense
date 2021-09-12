import { Revenu } from './revenu';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevenuService {

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public fb: FormBuilder) { }


  getRevenu() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/revenus', {headers})
  }

  getCategorieRevenu() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get('http://localhost:8000/api/categorie_revs', {headers})
  }

  createRevenu(form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.post('http://localhost:8000/api/revenus', formData, {headers})
  }

  updateRevenu(revenu: Revenu, form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.put(`http://localhost:8000/api/revenus/${revenu.id}`, formData, {headers})
  }

  supprimerRevenu(revenu: Revenu) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.delete(`http://localhost:8000/api/revenus/${revenu.id}`, {headers})
  }

  getMontantRevTotal() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/montant_total_rev', {headers})
  }

  getSoldeRestant() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/solde_restant', {headers})
  }

  getChartDataByMonth() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/chart_month_rev', {headers})
  }

  getChartPie() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/chart_pie_rev', {headers})
  }

  getChartPieDash() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.get('http://localhost:8000/api/chart_pie_dash', {headers})
  }
}
