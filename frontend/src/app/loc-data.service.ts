import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location } from './location';

@Injectable({
  providedIn: 'root'
})
export class LocDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://www.covidca.org/api';

  public getLocations(): Promise<Location[]> {
    const lng:number = -118.603219;
    const lat:number = 34.228716;
    const maxDistance: number = 20000000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&max=${maxDistance}`;
    return this.http
                .get(url)
                .toPromise()
                .then(response => response as Location[])
                .catch(this.handleError);
  }

  private handleError(error:any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
