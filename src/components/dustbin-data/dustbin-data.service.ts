import apiClient from "@/service/api-service";
import {
  collectorDustbinDataRequest,
  ICollectorDustbinDataResponse,
  IDustbinDataResponse,
  LocationData,
} from "./dustbin-data-model";
import { IErrorResponseModel } from "@/models/error-response-model";

export class DustbinDataService {
  public async fetchUserDustbinData(
    userLocation: LocationData
  ): Promise<IDustbinDataResponse> {
    const url = `/api/user-data/get-user-dustbin-data?Latitude=${userLocation.latitude}&Longitude=${userLocation.longitude}`;
    const postResponse = {} as IDustbinDataResponse;
    try {
      const response = await apiClient.get(url);
      postResponse.data = response.data;
      postResponse.isSucess = true;
      return postResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("dustbin data fetch failed:", error);
      postResponse.errorData = errorResponse.response.data;
      postResponse.isSucess = false;
      return postResponse;
    }
  }

  public async fetchCollectorDustbinData(
    colletorLocation: collectorDustbinDataRequest
  ): Promise<IDustbinDataResponse> {
    const url = `/api/user-data/get-collector-dustbin-data?LocalityName=${colletorLocation.localityName}&Latitude=${colletorLocation.latitude}&Longitude=${colletorLocation.longitude}`;
    const getResponse = {} as IDustbinDataResponse;
    try {
      const response = await apiClient.get(url);
      getResponse.data = response.data;
      getResponse.isSucess = true;
      return getResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("dustbin data fetch failed:", error);
      getResponse.errorData = errorResponse.response.data;
      getResponse.isSucess = false;
      return getResponse;
    }
  }

  public fetchCollectRoute = async (
    colletorLocation: collectorDustbinDataRequest
  ): Promise<ICollectorDustbinDataResponse> => {
    const url = `/api/user-data/get-collect-path?LocalityName=${colletorLocation.localityName}&Latitude=${colletorLocation.latitude}&Longitude=${colletorLocation.longitude}`;
    const getResponse = {} as ICollectorDustbinDataResponse;
    try {
      const response = await apiClient.get(url);
      getResponse.data = response.data;
      getResponse.isSucess = true;
      return getResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("dustbin data fetch failed:", error);
      getResponse.errorData = errorResponse.response.data;
      getResponse.isSucess = false;
      return getResponse;
    }
  };

  public fetchUserRoute = async (
    userLocation: LocationData
  ): Promise<ICollectorDustbinDataResponse> => {
    const url = `/api/user-data/get-user-path?Latitude=${userLocation.latitude}&Longitude=${userLocation.longitude}`;
    const getResponse = {} as ICollectorDustbinDataResponse;
    try {
      const response = await apiClient.get(url);
      getResponse.data = response.data;
      getResponse.isSucess = true;
      return getResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("dustbin data fetch failed:", error);
      getResponse.errorData = errorResponse.response.data;
      getResponse.isSucess = false;
      return getResponse;
    }
  }
}
