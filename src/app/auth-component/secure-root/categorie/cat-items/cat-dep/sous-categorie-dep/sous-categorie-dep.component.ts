import { CategorieService } from './../../../categorie.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { SousCategorieDepense } from './../sous-cat-dep';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sous-categorie-dep',
  templateUrl: './sous-categorie-dep.component.html',
  styleUrls: ['./sous-categorie-dep.component.css']
})
export class SousCategorieDepComponent implements OnInit {

  form: FormGroup;
  form2: FormGroup;
  sousCatDeps: any[];
  catDeps: any[];
  sousCatDepDefault: any[];
  catDepDefault: any[];

  constructor(private fb: FormBuilder, private fb2: FormBuilder, public toastr: ToastrService, private catService: CategorieService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      categorie_dep_id: ['', [Validators.required]],
      nom_sous_cat: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      desc_sous_cat: ['', [Validators.maxLength(100)]]
    });

    this.form2 = this.fb2.group({
      categorie_dep_id: ['', [Validators.required]],
      nom_sous_cat: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      desc_sous_cat: ['', [Validators.maxLength(100)]]
    });

    this.getSousCategorieDepense();
    this.getCategorieDepense();
  }

  get f() { return this.form.controls; }

  getSousCategorieDepense() {
    this.catService.getSousCategorieDepense()
    .subscribe((response: any)=>{
      this.sousCatDeps = response.data.mySousCat;
      this.sousCatDepDefault = response.data.default;
    }, err => {
      console.log(err);
    })
  }

  getCategorieDepense() {
    this.catService.getCategorieDepense()
    .subscribe((response: any)=>{
      this.catDeps = response.data.myCat;
      this.catDepDefault = response.data.default;
    }, err => {
      console.log(err);
    })
  }

  createSousCategorieDepense() {
    this.catService.createSousCategorieDepense(this.form)
    .subscribe((data: any) => {
      this.sousCatDeps.push(data.data);
      this.form = this.fb.group({
        categorie_dep_id: ['', [Validators.required]],
        nom_sous_cat: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
        desc_sous_cat: ['', [Validators.maxLength(100)]]
      });
      this.toastr.success('categorie creee');
    }, err => {
      this.toastr.error('Une erreur s\'est produite. Une categorie du meme nom existe deja.');
      console.log(err)
    })
  }

  createFormUpdate(sous_categorie_dep: SousCategorieDepense) {
    this.form2 = this.fb2.group({
      categorie_dep_id: [sous_categorie_dep.categorie_dep_id, [Validators.required]],
      nom_sous_cat: [sous_categorie_dep.nom_sous_cat, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      desc_sous_cat: [sous_categorie_dep.desc_sous_cat, [Validators.maxLength(100)]]
    });
  }

  get f2() { return this.form2.controls; }

  updateSousCategorieDepense(sous_categorie_dep: SousCategorieDepense) {
    this.catService.updateSousCategorieDepense(sous_categorie_dep, this.form2)
    .subscribe((data: any) => {
      var pos = this.sousCatDeps.indexOf(sous_categorie_dep);
      this.sousCatDeps.splice(pos, 1, data.data);
      this.toastr.success('categorie modifie');
      console.log(data)
    }, err => {
      this.toastr.error('Une erreur s\'est produit! Une categorie du meme nom existe deja.');
      console.log(err)
    })
  }

  supprimerSousCategorieDepense(sous_categorie_dep: SousCategorieDepense) {
    Swal.fire({
      title: 'Etes-vous sure?',
      text: "Vous ne pourrez pas revenir en arriere!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if(result.isConfirmed) {
        this.catService.supprimerSousCategorieDepense(sous_categorie_dep)
        .subscribe(() => {
          var pos = this.sousCatDeps.indexOf(sous_categorie_dep);
          if(pos > -1) {
            this.sousCatDeps.splice(pos,1);
            this.toastr.success('Suppression reussi');
          }
        }, err => {
          this.toastr.error('Une erreur s\'est produit!');
          console.log(sous_categorie_dep);
          console.log(err);
        })
      }
    })
  }

}
