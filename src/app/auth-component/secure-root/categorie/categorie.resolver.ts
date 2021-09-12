import { CategorieService } from './categorie.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieResolver implements Resolve<any> {

  constructor(public catService: CategorieService) {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.catService.getCategorieDepense();
  }
}
