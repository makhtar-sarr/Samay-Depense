import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { CategorieService } from './categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: any;
  constructor(
    private authService: AuthService,
    private router: Router, private catService: CategorieService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (response: any) => {
        this.categories = response.data;
      }
    )
  }
}
