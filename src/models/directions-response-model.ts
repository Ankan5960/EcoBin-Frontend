export interface DirectionsResponseModel {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

interface Route {
  weight_name: string;
  weight: string;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

interface Leg {
  via_waypoints: object[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: object[];
  distance: number;
  summary: string;
}

interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

interface Geometry {
  coordinates: number[][];
  type: string;
}
interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}
