import { RevenuService } from './revenu.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenuResolver implements Resolve<any> {
  constructor(public revenuService: RevenuService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.revenuService.getRevenu();
  }
}
