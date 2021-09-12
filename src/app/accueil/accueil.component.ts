import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  bg1:any = "../assets/images/bgimg.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
