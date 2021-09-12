import { DepenseService } from './depense.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DepenseResolver implements Resolve<any> {

  constructor(public depenseService: DepenseService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.depenseService.getDepense();
  }
}
