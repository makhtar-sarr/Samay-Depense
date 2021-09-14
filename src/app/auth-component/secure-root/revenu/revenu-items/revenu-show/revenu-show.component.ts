import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RevenuService } from './../../revenu.service';
import { Component, OnInit } from '@angular/core';
import { Revenu } from '../../revenu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revenu-show',
  templateUrl: './revenu-show.component.html',
  styleUrls: ['./revenu-show.component.css']
})
export class RevenuShowComponent implements OnInit {

  revenu: any;
  catRevs: any[];
  catRevDefault: any[];
  form2: FormGroup;

  constructor(private revenuService: RevenuService, public activatedRoute: ActivatedRoute, private fb2: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.form2 = this.fb2.group({
      montant_rev: ['', [Validators.required, Validators.min(1)]],
      categorie_rev_id: ['', [Validators.required]],
    });

    this.showRevenue(this.activatedRoute.snapshot.params.id);

    this.revenuService.getCategorieRevenu()
    .subscribe((response: any) => {
      this.catRevs = response.data.myCat;
      this.catRevDefault = response.data.default;
    }, error => {
      console.log(error);
    })
  }

  showRevenue(id: number) {
    this.revenuService.showRevenu(id)
    .subscribe((response: any) => {
      this.revenu = response.data;
    }, error => {
      console.log(error);
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
      this.revenu = data.data;
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
          this.router.navigate(['/revenu']);
          this.toastr.success('Suppression reussi');
        }, err => {
          this.toastr.error('Une erreur s\'est produit!');
          console.log(err);
        })
      }
    })
  }

}
