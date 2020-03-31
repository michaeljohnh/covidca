import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {

  lastUpdated:string = 'March 31, 2021'
  CADeathsCumulative:number = 150;
  CACasesCumulative: number = 6932;
  CACasesNew: number = 1259;
  CADeathsNew: number = 15;

  constructor() { }

  ngOnInit() {
  }

}
