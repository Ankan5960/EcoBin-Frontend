export type DustbinStatus = {
  statusName: string;
  statusValue: number;
};

export interface DustbinStatusList {
    dustbinStatusList: DustbinStatus[];
}

export type DustbinCategory = {
    categoryName: string;
    count: number;
}

export interface DustbinCategoryList {
    dustbinCategoryList: DustbinCategory[];
}

export interface ReportDataResponse {
    totalDustbins: string;
    totalActiveDustbins: string;
    totalWeightData: string;
    totalAirQualityData: string;
    categories: Record<string, number>;
  }