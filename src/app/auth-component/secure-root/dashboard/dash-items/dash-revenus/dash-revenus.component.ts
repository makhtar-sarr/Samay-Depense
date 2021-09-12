import { RevenuService } from './../../../revenu/revenu.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-revenus',
  templateUrl: './dash-revenus.component.html',
  styleUrls: ['./dash-revenus.component.css']
})
export class DashRevenusComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  revenus: any[];
  catRevs: any[];
  catRevDefault: any[];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private revService: RevenuService) {}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.revService.getRevenu()
      .subscribe(data => {
        this.revenus = (data as any).data;
        this.dtTrigger.next();
      });
    this.revService.getCategorieRevenu()
    .subscribe((response: any) => {
      this.catRevs = response.data.myCat;
      this.catRevDefault = response.data.default;
    }, error => {
      console.log(error);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
