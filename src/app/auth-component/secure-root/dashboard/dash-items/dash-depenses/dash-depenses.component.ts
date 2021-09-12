import { Subject } from 'rxjs';
import { DepenseService } from './../../../depense/depense.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-depenses',
  templateUrl: './dash-depenses.component.html',
  styleUrls: ['./dash-depenses.component.css']
})
export class DashDepensesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  depenses: any[];
  catDeps: any[];
  catDepDefault: any[];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private depService: DepenseService) {}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.depService.getDepense()
      .subscribe(data => {
        this.depenses = (data as any).data;
        this.dtTrigger.next();
      });
    this.depService.getCategorieDepense()
    .subscribe((response: any) => {
      this.catDeps = response.data.myCat;
      this.catDepDefault = response.data.default;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
