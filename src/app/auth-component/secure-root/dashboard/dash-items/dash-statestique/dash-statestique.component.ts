import { RevenuService } from './../../../revenu/revenu.service';
import { Chart } from 'chart.js';
import { DepenseService } from './../../../depense/depense.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-statestique',
  templateUrl: './dash-statestique.component.html',
  styleUrls: ['./dash-statestique.component.css']
})
export class DashStatestiqueComponent implements OnInit {

  dataMonth: any = [];
  labelMonth: any = [];
  chartMonth: any = [];
  dataMonthRev: any = [];
  labelMonthRev: any = [];
  chartMonthRev: any = [];
  dataPie: any = [];
  labelPie: any = [];
  chartPie: any = [];
  montantRev: any = [];
  montantDep: any = [];
  reste: any = [];

  constructor(private depenseService: DepenseService, private revenuService: RevenuService) { }

  ngOnInit(): void {
    this.depenseService.getChartDataByMonth()
    .subscribe((response: any) => {
      this.dataMonth = response.data.data;
      this.labelMonth = response.data.label;

      this.chartMonth = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.labelMonth,
          datasets: [{
            data: this.dataMonth,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(128, 0, 0, 0.2)',
              'rgba(75, 92, 92, 0.2)',
              'rgba(153, 10, 255, 0.2)',
              'rgba(255, 59, 64, 0.2)',
              'rgba(128, 30, 0, 0.2)',
              'rgba(255, 9, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(128, 0, 0, 1)',
              'rgba(75, 92, 92, 1)',
              'rgba(153, 10, 255, 1)',
              'rgba(255, 59, 64, 1)',
              'rgba(128, 30, 0, 1)',
              'rgba(255, 9, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              display: true
            }],
          },
          responsive: true
      }
      })
    }, error => {
      console.log(error);
    });

    this.revenuService.getChartDataByMonth()
    .subscribe((response: any) => {
      this.dataMonthRev = response.data.data;
      this.labelMonthRev = response.data.label;

      this.chartMonthRev = new Chart('canvasMonth', {
        type: 'bar',
        data: {
          labels: this.labelMonthRev,
          datasets: [{
            data: this.dataMonthRev,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(128, 0, 0, 0.2)',
              'rgba(75, 92, 92, 0.2)',
              'rgba(153, 10, 255, 0.2)',
              'rgba(255, 59, 64, 0.2)',
              'rgba(128, 30, 0, 0.2)',
              'rgba(255, 9, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(128, 0, 0, 1)',
              'rgba(75, 92, 92, 1)',
              'rgba(153, 10, 255, 1)',
              'rgba(255, 59, 64, 1)',
              'rgba(128, 30, 0, 1)',
              'rgba(255, 9, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              display: true
            }],
          },
          responsive: true
      }
      })
    }, error => {
      console.log(error);
    });

    this.revenuService.getChartPieDash()
    .subscribe((response: any) => {
      this.dataPie = response.data.data;
      this.labelPie = response.data.label;

      this.chartPie = new Chart('canvasPie', {
        type: 'pie',
        data: {
          labels: this.labelPie,
          datasets: [{
            label: '# of Votes',
            data: this.dataPie,
            backgroundColor: [
              '#46BFBD',
              '#F7464A'
            ]
          }]
        },
        options: {
          responsive: true
      }
      })
    }, error => {
      console.log(error);
    })

    this.revenuService.getMontantRevTotal()
    .subscribe((response: any) => {
      this.montantRev = response.data;
    }, error => {
      console.log(error);
    });

    this.depenseService.getMontantDepTotal()
    .subscribe((response: any) => {
      this.montantDep = response.data;
    }, error => {
      console.log(error);
    });

    this.depenseService.getSoldeRestant()
    .subscribe((response: any) => {
      this.reste = response.data;
    }, error => {
      console.log(error);
    });

  }

}
