import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(distance: number): string {
    const isNumeric = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (distance && isNumeric(distance)) {
      let thisDistance = '0';
      let unit = 'mi';
      thisDistance = (distance * 0.000621371).toFixed(1);

      return thisDistance + unit;
    }
    else {
      return '?';
    }
  }
}
