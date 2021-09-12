import { ActivatedRoute } from '@angular/router';
import { DepenseService } from './depense.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  depenses: any[];

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.depenses = response.data;
      });
  }

}
