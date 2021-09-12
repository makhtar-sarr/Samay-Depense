import { CategorieRevenu } from './cat-items/cat-rev/cat-rev';
import { SousCategorieDepense } from './cat-items/cat-dep/sous-cat-dep';
import { CategorieDepense } from './cat-items/cat-dep/cat-dep';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(public httpClient: HttpClient) { }

  getCategorieDepense() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get('http://localhost:8000/api/categorie_deps', {headers})
  }

  createCategorieDepense(form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.post('http://localhost:8000/api/categorie_deps', formData, {headers})
  }

  updateCategorieDepense(categorie_dep: CategorieDepense, form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.put(`http://localhost:8000/api/categorie_deps/${categorie_dep.id}`, formData, {headers})
  }

  supprimerCategorieDepense(categorie_dep: CategorieDepense) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.delete(`http://localhost:8000/api/categorie_deps/${categorie_dep.id}`, {headers})
  }

  getSousCategorieDepense() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get('http://localhost:8000/api/sous_categorie_deps', {headers})
  }

  createSousCategorieDepense(form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.post('http://localhost:8000/api/sous_categorie_deps', formData, {headers})
  }

  updateSousCategorieDepense(sous_categorie_dep: SousCategorieDepense, form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.put(`http://localhost:8000/api/sous_categorie_deps/${sous_categorie_dep.id}`, formData, {headers})
  }

  supprimerSousCategorieDepense(sous_categorie_dep: SousCategorieDepense) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.delete(`http://localhost:8000/api/sous_categorie_deps/${sous_categorie_dep.id}`, {headers})
  }

  getCategorieRevenu() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get('http://localhost:8000/api/categorie_revs', {headers})
  }

  createCategorieRevenu(form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.post('http://localhost:8000/api/categorie_revs', formData, {headers})
  }

  updateCategorieRevenu(categorie_rev: CategorieRevenu, form: FormGroup) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = form.getRawValue();
    return this.httpClient.put(`http://localhost:8000/api/categorie_revs/${categorie_rev.id}`, formData, {headers})
  }

  supprimerCategorieRevenu(categorie_rev: CategorieRevenu) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.delete(`http://localhost:8000/api/categorie_revs/${categorie_rev.id}`, {headers})
  }

}
