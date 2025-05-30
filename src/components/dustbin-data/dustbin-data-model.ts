import { DirectionsResponseModel } from "@/models/directions-response-model";
import { IErrorResponseModel } from "@/models/error-response-model";

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
  isDangrouse: boolean | null;
}

export interface DustbinDetailsDataModel {
  dustbinId: string;
  locationDataId: string;
  latitude: string;
  longitude: string;
  regionId: string;
  countryName: string;
  regionName: string;
  districtName: string;
  placeName: string;
  localityName: string;
  addressName: string;
  pinCode: string;
  sensorDataId: string;
  weightData: string;
  airQualityData: string;
  levelFillData: string;
  categoryId: string;
  categoryName: string;
}

export interface collectorDustbinDataRequest {
    localityName: string | null;
    latitude: string | number;
    longitude: string | number;
}

export interface IDustbinDataResponse {
    isSucess: boolean;
    data: DustbinData[];
    errorData: IErrorResponseModel;
}

export interface ICollectorDustbinDataResponse {
    isSucess: boolean;
    data: DirectionsResponseModel;
    errorData: IErrorResponseModel;
}