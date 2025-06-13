export interface ILogoutRequest {
  refreshToken: string;
}

export interface IUserLogoutResponse {
  isLoggedOut: boolean;
  message: string;
}
