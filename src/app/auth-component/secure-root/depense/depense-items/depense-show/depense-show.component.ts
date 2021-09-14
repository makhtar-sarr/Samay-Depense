import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DepenseService } from './../../depense.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Depense } from '../../depense';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depense-show',
  templateUrl: './depense-show.component.html',
  styleUrls: ['./depense-show.component.css']
})
export class DepenseShowComponent implements OnInit {

  depense: any;
  catDeps: any[];
  catDepDefault: any[];
  sousCatDeps: any[];
  sousCatDepDefault: any[];
  form2: FormGroup;
  sousCatInput: any[];

  constructor(private depenseService: DepenseService, public activatedRoute: ActivatedRoute, private fb2: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.form2 = this.fb2.group({
      nom_dep: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      montant_dep: ['', [Validators.required, Validators.min(1)]],
      categorie_dep_id: ['', [Validators.required]],
      sous_categorie_dep_id: [''],
      description_dep: ['']
    });

    this.showDepense(this.activatedRoute.snapshot.params.id);

    this.depenseService.getCategorieDepense()
    .subscribe((response: any) => {
      this.catDeps = response.data.myCat;
      this.catDepDefault = response.data.default;
    }, error => {
      console.log(error);
    });
    
    this.depenseService.getSousCategorieDepense()
    .subscribe((response: any) => {
      this.sousCatDeps = response.data.myCat;
      this.sousCatDepDefault = response.data.default;
      console.log(this.sousCatDeps)
    }, error => {
      console.log(error);
    });
  }

  showDepense(id: number) {
    this.depenseService.showDepense(id)
    .subscribe((response: any) => {
      this.depense = response.data;
    }, error => {
      console.log(error);
    })
  }

  createFormUpdate(depense: Depense) {
    this.form2 = this.fb2.group({
      nom_dep: [depense.nom_dep, [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      montant_dep: [depense.montant_dep, [Validators.required, Validators.min(1)]],
      categorie_dep_id: [depense.categorie_dep_id, [Validators.required]],
      sous_categorie_dep_id: [depense.sous_categorie_dep_id],
      description_dep: [depense.description_dep]
    });
  }

  get f2() { return this.form2.controls; }

  updateDepense(depense: Depense) {
    this.depenseService.updateDepense(depense, this.form2)
    .subscribe((data: any) => {
      this.depense = data.data;
      this.toastr.success('Depense modifie');
    }, err => {
      this.toastr.error('Une erreur s\'est produit! Une categorie du meme nom existe deja.');
      console.log(err)
    })
  }

  supprimerDepense(depense: Depense) {
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
        this.depenseService.supprimerDepense(depense)
        .subscribe(() => {
          this.router.navigate(['/revenu']);
          this.toastr.success('Suppression reussi');
        }, err => {
          this.toastr.error('Une erreur s\'est produit!');
          console.log(err);
        })
      }
    })
  }

  getSousCatByCat(cat: number) {
    this.depenseService.getSousCatByCat(cat)
    .subscribe(
      (response : any) => {
        this.sousCatInput = response.data;
      }, error => {
        console.log(error)
      }
    )
  }

}
