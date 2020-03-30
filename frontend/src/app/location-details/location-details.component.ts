import { Component, OnInit } from '@angular/core';

import {ActivatedRoute,ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { Location } from '../location';
import { LocDataService } from '../loc-data.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  newLocation: Location;

  constructor(private locDataService: LocDataService,
              private route: ActivatedRoute) { }

  ngOnInit() :void{
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap)=> {
          let id = params.get('locationId');
          return this.locDataService.getLocationById(id);
        })
      )
      .subscribe((newLocation: Location) => {
        this.newLocation=newLocation;
      });
  }

}
