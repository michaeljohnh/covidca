import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Location } from '../location';
import { LocDataService } from '../loc-data.service';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private locDataService: LocDataService,
              private geolocationService: GeolocationService) { }

  public locations: Location[];
  public message: string;

  private getLocations(position:any): void {
    console.log('Searching for nearby places');
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    this.locDataService
        .getLocations(lat,lng)
        .then(foundLocations => {
          this.message = foundLocations.length > 0 ? '' : 'No locations found';
          this.locations = foundLocations;
        });
    
  }

  private showError(error:any):void {
    // this.message= error.message;

    const lng:number = -118.603219;
    const lat:number = 34.228716;
    this.locDataService
        .getLocations(lat,lng)
        .then(foundLocations => {
          this.message = foundLocations.length > 0 ? '' : 'No locations found';
          this.locations = foundLocations;
        });
  };

  private noGeo(): void {
    this.message = 'Unable to find your location'
  }

  private getPosition(): void {
    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }

  displayedColumns: string[] = ['name', 'distance', 'totalbeds'];

  ngOnInit() {
    // this.getLocations();
    this.getPosition();
  }

}
