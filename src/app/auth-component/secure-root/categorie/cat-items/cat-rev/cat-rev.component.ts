import { CategorieService } from './../../categorie.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategorieRevenu } from './cat-rev';

@Component({
  selector: 'app-cat-rev',
  templateUrl: './cat-rev.component.html',
  styleUrls: ['./cat-rev.component.css']
})
export class CatRevComponent implements OnInit {

  form: FormGroup;
  form2: FormGroup;
  catRevs: any[];
  catRevDefault: any[];

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

    this.getCategorieRevenu();
  }

  get f() { return this.form.controls; }

  getCategorieRevenu() {
    this.catService.getCategorieRevenu()
    .subscribe((response: any)=>{
      this.catRevs = response.data.myCat;
      this.catRevDefault = response.data.default;
    }, err => {
      console.log(err);
    })
  }

  createCategorieRevenu() {
    this.catService.createCategorieRevenu(this.form)
    .subscribe((data: any) => {
      this.catRevs.push(data.data);
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

  createFormUpdate(categorie_rev: CategorieRevenu) {
    this.form2 = this.fb2.group({
      nom_cat: [categorie_rev.nom_cat, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      description_cat: [categorie_rev.description_cat, [Validators.maxLength(100)]]
    });
  }

  get f2() { return this.form2.controls; }

  updateCategorieRevenu(categorie_rev: CategorieRevenu) {
    this.catService.updateCategorieRevenu(categorie_rev, this.form2)
    .subscribe((data: any) => {
      var pos = this.catRevs.indexOf(categorie_rev);
      this.catRevs.splice(pos, 1, data.data);
      this.toastr.success('categorie modifie');
      console.log(data)
    }, err => {
      this.toastr.error('Une erreur s\'est produit! Une categorie du meme nom existe deja.');
      console.log(err)
    })
  }

  supprimerCategorieRevenu(categorie_rev: CategorieRevenu) {
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
        this.catService.supprimerCategorieRevenu(categorie_rev)
        .subscribe(() => {
          var pos = this.catRevs.indexOf(categorie_rev);
          if(pos > -1) {
            this.catRevs.splice(pos,1);
            this.toastr.success('Suppression reussi');
          }
        }, err => {
          this.toastr.error('Une erreur s\'est produit!');
          console.log(categorie_rev);
          console.log(err);
        })
      }
    })
  }

}
