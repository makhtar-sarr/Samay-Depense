import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from './../../../categorie/categorie.service';
import { RevenuService } from './../../revenu.service';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Revenu } from '../../revenu';

@Component({
  selector: 'app-revenu-list',
  templateUrl: './revenu-list.component.html',
  styleUrls: ['./revenu-list.component.css']
})
export class RevenuListComponent implements OnInit {

  revenus: any[];
  catRevs: any[];
  catRevDefault: any[];
  form: FormGroup;
  form2: FormGroup;
  @Input() labCat: string = 'categorie';
  montant: number = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private revenuService: RevenuService, private catService: CategorieService, public fb: FormBuilder, public fb2: FormBuilder, public toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      montant_rev: ['', [Validators.required, Validators.min(1)]],
      categorie_rev_id: ['', [Validators.required]],
    });

    this.form2 = this.fb2.group({
      montant_rev: ['', [Validators.required, Validators.min(1)]],
      categorie_rev_id: ['', [Validators.required]],
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.revenuService.getRevenu()
      .subscribe(data => {
        this.revenus = (data as any).data;
        this.dtTrigger.next();
      });

    this.getCategorieRevenu();


  }

  get f1() { return this.form.controls; }

  getCategorieRevenu() {
    this.catService.getCategorieRevenu()
    .subscribe((response: any)=>{
      this.catRevs = response.data.myCat;
      this.catRevDefault = response.data.default;
    }, err => {
      console.log(err);
    })
  }

  createRevenu() {
    this.revenuService.createRevenu(this.form)
    .subscribe((data: any) => {
      this.revenus.push(data.data);
      this.form = this.fb.group({
        montant_rev: ['', [Validators.required, Validators.min(1)]],
        categorie_rev_id: ['', [Validators.required]],
      });;
      this.toastr.success('Revenu ajoute');
    }, err => {
      this.toastr.error('Une erreur s\'est produit!');
      console.log(err)
    })
  }

  createFormUpdate(revenu: Revenu) {
    this.form2 = this.fb2.group({
      montant_rev: [revenu.montant_rev, [Validators.required, Validators.min(1)]],
      categorie_rev_id: [revenu.categorie_rev_id, [Validators.required]],
    });
  }

  get f2() { return this.form2.controls; }

  updateRevenu(revenu: Revenu) {
    this.revenuService.updateRevenu(revenu, this.form2)
    .subscribe((data: any) => {
      var pos = this.revenus.indexOf(revenu);
      this.revenus.splice(pos, 1, data.data);
      this.toastr.success('Revenu modifie');
      console.log(data)
    }, err => {
      this.toastr.error('Une erreur s\'est produit!');
      console.log(err)
    })
  }

  supprimerRevenu(revenu: Revenu) {
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
        this.revenuService.supprimerRevenu(revenu)
        .subscribe(() => {
          var pos = this.revenus.indexOf(revenu);
          if(pos > -1) {
            this.revenus.splice(pos,1);
            this.toastr.success('Suppression reussi');
          }
        }, err => {
          this.toastr.error('Une erreur s\'est produit!');
          console.log(err);
        })
      }
    })
  }

}
