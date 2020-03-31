import { Component, OnInit } from '@angular/core';

import {ActivatedRoute,ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { Location } from '../location';
import { LocDataService } from '../loc-data.service';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  newLocation: Location;

  public googleAPIKey: string = 'AIzaSyBRf_AeH7ntkmPXKuE4NNvfSCnpa2UXTv4';
  
  public emergencyType:string ='NOTHING';

  constructor(private locDataService: LocDataService,
              private route: ActivatedRoute) { }

  
  public checkEType():void {
    if (this.newLocation.ER_SERVICE_LEVEL_DESC=='Emergency - Basic') {
      this.emergencyType = 'Basic';
    } else if (this.newLocation.ER_SERVICE_LEVEL_DESC=='Emergency - Standby') {
      this.emergencyType = 'Standby';
    } else if (this.newLocation.ER_SERVICE_LEVEL_DESC=='Emergency - Comprehensive') {
      this.emergencyType = 'Comprehensive';
    } else {
      this.emergencyType = 'none';
    }
  }


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
        this.checkEType();
    });


  }

}
