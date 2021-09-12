import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategorieService } from './../../../categorie/categorie.service';
import { DepenseService } from './../../depense.service';
import { Component, Input, OnInit } from '@angular/core';
import { Depense } from '../../depense';

@Component({
  selector: 'app-depense-liste',
  templateUrl: './depense-liste.component.html',
  styleUrls: ['./depense-liste.component.css']
})
export class DepenseListeComponent implements OnInit {

  depenses: any[];
  catDeps: any[];
  catDepDefault: any[];
  sousCatDeps: any[];
  sousCatInput: any[];
  form: FormGroup;
  form2: FormGroup;
  @Input() labCat: string = 'categorie';
  montant: number = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private depenseService: DepenseService, private catService: CategorieService, public fb: FormBuilder, public fb2: FormBuilder, public toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      nom_dep: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      montant_dep: ['', [Validators.required, Validators.min(1)]],
      categorie_dep_id: ['', [Validators.required]],
      sous_categorie_dep_id: [''],
      description_dep: ['']
    });

    this.form2 = this.fb2.group({
      nom_dep: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      montant_dep: ['', [Validators.required, Validators.min(1)]],
      categorie_dep_id: ['', [Validators.required]],
      sous_categorie_dep_id: [''],
      description_dep: ['']
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.depenseService.getDepense()
      .subscribe(data => {
        this.depenses = (data as any).data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });

    this.getCategorieDepense();
    this.getSousCategorieDepense();


  }

  get f1() { return this.form.controls; }

  getCategorieDepense() {
    this.catService.getCategorieDepense()
    .subscribe((response: any)=>{
      this.catDeps = response.data.myCat;
      this.catDepDefault = response.data.default;
    }, err => {
      console.log(err);
    })
  }

  getSousCategorieDepense() {
    this.catService.getSousCategorieDepense()
    .subscribe((response: any)=>{
      this.sousCatDeps = response.data.mySousCat;
    }, err => {
      console.log(err);
    });
  }

  createDepense() {
    this.depenseService.createDepense(this.form)
    .subscribe((data: any) => {
      this.depenses.push(data.data);
      this.form = this.fb.group({
        nom_dep: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
        montant_dep: ['', [Validators.required, Validators.min(1)]],
        categorie_dep_id: ['', [Validators.required]],
        sous_categorie_dep_id: [''],
        description_dep: ['']
      });;
      this.toastr.success('Depense ajoute');
    }, err => {
      this.toastr.error('Une erreur s\'est produit! Une categorie du meme nom existe deja.');
      console.log(err)
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
      var pos = this.depenses.indexOf(depense);
      this.depenses.splice(pos, 1, data.data);
      this.toastr.success('Depense modifie');
      console.log(data)
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
          var pos = this.depenses.indexOf(depense);
          if(pos > -1) {
            this.depenses.splice(pos,1);
            this.toastr.success('Suppression reussi');
          }
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
