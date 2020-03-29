export class Distance {
  calculated: number;
}

export class Coordinates {
  type: string;
  coordinates: number[];
}

export class Location {
  id: string;
  FACILITY_NAME: string;
  FACILITY_LEVEL_DESC: string;
  DBA_ADDRESS1: string;
  DBA_CITY: string;
  DBA_ZIP_CODE: number;
  COUNTY_CODE: number;
  COUNTY_NAME: string;
  ER_SERVICE_LEVEL_DESC: string;
  TOTAL_NUMBER_BEDS: number;
  FACILITY_STATUS_DESC: string;
  FACILITY_STATUS_DATE: string;
  LICENSE_TYPE_DESC: string;
  LICENSE_CATEGORY_DESC: string;
  LATITUDE: number;
  LONGITUDE: number;
  coords: Coordinates;
  distance:Distance;
}
