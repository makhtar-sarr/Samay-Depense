import { CategorieService } from './../../../categorie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CategorieDepense } from './../cat-dep';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorie-dep',
  templateUrl: './categorie-dep.component.html',
  styleUrls: ['./categorie-dep.component.css']
})
export class CategorieDepComponent implements OnInit {

  form: FormGroup;
  form2: FormGroup;
  catDeps: any[];
  catDepDefault: any[];

  constructor(private fb: FormBuilder, private fb2: FormBuilder, public toastr: ToastrService, private catService: CategorieService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom_cat: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      description_cat: ['', [Validators.maxLength(100)]]
    });

    this.form2 = this.fb2.group({
      nom_cat: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      description_cat: ['', [Validators.maxLength(100)]]
    });

    this.getCategorieDepense();
  }

  get f() { return this.form.controls; }

  getCategorieDepense() {
    this.catService.getCategorieDepense()
    .subscribe((response: any)=>{
      this.catDeps = response.data.myCat;
      this.catDepDefault = response.data.default;
      console.log(this.catDepDefault)
    }, err => {
      console.log(err);
    });
  }

  createCategorieDepense() {
    this.catService.createCategorieDepense(this.form)
    .subscribe((data: any) => {
      this.catDeps.push(data.data);
      this.form = this.fb.group({
        nom_cat: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
        description_cat: ['', [Validators.maxLength(100)]]
      });
      this.toastr.success('categorie creee');
    }, err => {
      this.toastr.error('Une erreur s\'est produit! Une categorie du meme nom existe deja.');
      console.log(err)
    })
  }

  createFormUpdate(categorie_dep: CategorieDepense) {
    this.form2 = this.fb2.group({
      nom_cat: [categorie_dep.nom_cat, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      description_cat: [categorie_dep.description_cat, [Validators.maxLength(100)]]
    });
  }

  get f2() { return this.form2.controls; }

  updateCategorieDepense(categorie_dep: CategorieDepense) {
    this.catService.updateCategorieDepense(categorie_dep, this.form2)
    .subscribe((data: any) => {
      var pos = this.catDeps.indexOf(categorie_dep);
      this.catDeps.splice(pos, 1, data.data);
      this.form2 = this.fb2.group({
        nom_cat: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
        description_cat: ['', [Validators.maxLength(100)]]
      });
      this.toastr.success('categorie modifie');
      console.log(data)
    }, err => {
      this.toastr.error('Une erreur s\'est produit! Une categorie du meme nom existe deja.');
      console.log(err)
    })
  }

  supprimerCategorieDepense(categorie_dep: CategorieDepense) {
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
        this.catService.supprimerCategorieDepense(categorie_dep)
        .subscribe(() => {
          var pos = this.catDeps.indexOf(categorie_dep);
          if(pos > -1) {
            this.catDeps.splice(pos,1);
            this.toastr.success('Suppression reussi');
          }
        }, err => {
          this.toastr.error('Une erreur s\'est produit! Verifier si cette categorie n\'est pas relie a un sous-categorie ou un depense.');
          console.log(categorie_dep);
          console.log(err);
        })
      }
    })
  }

}
