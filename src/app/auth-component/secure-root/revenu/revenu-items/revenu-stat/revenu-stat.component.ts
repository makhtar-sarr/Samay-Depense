import { Chart } from 'chart.js';
import { RevenuService } from './../../revenu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revenu-stat',
  templateUrl: './revenu-stat.component.html',
  styleUrls: ['./revenu-stat.component.css']
})
export class RevenuStatComponent implements OnInit {
  montant: number;
  dataPie: any[];
  chartPie: any = [];
  dataMonth: any = [];
  labelMonth: any = [];
  chartMonth: any = [];
  labelPie: any = [];
  soldeRestant: any = [];

  constructor(private revenuService: RevenuService) { }

  ngOnInit(): void {
    this.revenuService.getChartDataByMonth()
    .subscribe((response: any) => {
      this.dataMonth = response.data.data;
      this.labelMonth = response.data.label;

      this.chartMonth = new Chart('canvasMonth', {
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

    this.revenuService.getChartPie()
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
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
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
      this.montant = response.data;
    }, error => {
      console.log(error);
    });

    this.revenuService.getSoldeRestant()
    .subscribe((response: any) => {
      this.soldeRestant = response.data;
    }, error => {
      console.log(error);
    });

  }
}
