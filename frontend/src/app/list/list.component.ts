import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { LocDataService } from '../loc-data.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private locDataService: LocDataService) { }

  public locations: Location[];

  private getLocations(): void {
    this.locDataService
        .getLocations()
        .then(foundLocations => this.locations = foundLocations);
    
  }

  displayedColumns: string[] = ['name', 'distance', 'totalbeds'];

  ngOnInit() {
    this.getLocations();
  }

}
