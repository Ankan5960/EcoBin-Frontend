export interface LocationData {
  latitude: string;
  longitude: string;
}

export interface RegionData {
  countryName: string;
  regionName: string;
  districtName: string;
  placeName: string;
  addressName: string;
  pinCode: string;
}

export interface SensorData {
  weightData: string;
  airQualityData: string;
  levelFillData: string;
}

export interface CategoryEntity {
  categoryId: string;
  categoryName: string;
}

export interface DustbinData {
  dustbinId: string;
  location: LocationData;
  region: RegionData;
  sensorData: SensorData;
  category: CategoryEntity;
  distanceFromUser: string;
}
