import { DepenseService } from './../../depense.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-depense-stat',
  templateUrl: './depense-stat.component.html',
  styleUrls: ['./depense-stat.component.css']
})
export class DepenseStatComponent implements OnInit {

  montant: number;
  dataDay: any[];
  dataPie: any[];
  chart: any = [];
  chartPie: any = [];
  label: any = [];
  dataMonth: any = [];
  labelMonth: any = [];
  chartMonth: any = [];
  labelPie: any = [];
  soldeRestant: any = [];

  constructor(private depenseService: DepenseService) { }

  ngOnInit(): void {
    this.depenseService.getChartDataByDay()
    .subscribe((response: any) => {
      this.dataDay = response.data.data;
      this.label = response.data.label;
      console.log(this.label)

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.label,
          datasets: [{
            data: this.dataDay,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(128, 0, 0, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(128, 0, 0, 1)',
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

    this.depenseService.getChartDataByMonth()
    .subscribe((response: any) => {
      this.dataMonth = response.data.data;
      this.labelMonth = response.data.label;
      console.log(this.label)

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

    this.depenseService.getChartPie()
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

    this.depenseService.getMontantDepTotal()
    .subscribe((response: any) => {
      this.montant = response.data;
    }, error => {
      console.log(error);
    });

    this.depenseService.getSoldeRestant()
    .subscribe((response: any) => {
      this.soldeRestant = response.data;
    }, error => {
      console.log(error);
    });

  }

}
