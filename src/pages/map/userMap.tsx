import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import type React from "react";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type {
  CategoryEntity,
  DustbinData,
  LocationData,
  SensorData,
} from "@/models/dustbin-model";
import userLocationStore from "@/store/userLocationStore";
import { useUserDustbinData } from "@/hooks/useUserDustbinData";

const generatePopupContent = (
  sensorData: SensorData,
  category: CategoryEntity
): string => {
  return `
    <div style="padding: 8px; background: white; font-size: 15px; color: black; border-radius: 5px;">
      <strong>Weight:</strong> ${sensorData.weightData}<br/>
      <strong>Air Quality:</strong> ${sensorData.airQualityData}<br/>
      <strong>Fill:</strong> ${sensorData.levelFillData}<br/>
      <strong>Category:</strong> ${category.categoryName}
    </div>
  `;
};

const mapBoxConfiguration = (
  mapContainerRef: React.RefObject<HTMLDivElement | null>,
  userLocation: LocationData | null
  //mapboxApiKey: string | null
) => {
  if (!mapContainerRef.current) {
    throw new Error("Map container not ready");
  }

  // mapboxgl.accessToken = mapboxApiKey;
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const map = new mapboxgl.Map({
    container: mapContainerRef.current!,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [Number(userLocation?.longitude), Number(userLocation?.latitude)],
    zoom: 14,
  });

  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(new mapboxgl.GeolocateControl());

  return map;
};

const handleMapLoad = async (map: mapboxgl.Map, datas: DustbinData[]) => {
  const popups: mapboxgl.Popup[] = [];

  datas.forEach((data: DustbinData) => {
    const popup = new mapboxgl.Popup().setHTML(
      generatePopupContent(data.sensorData, data.category)
    );

    new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat([
        Number(data.location.longitude),
        Number(data.location.latitude),
      ])
      .setPopup(popup)
      .addTo(map);

    popups.push(popup);
  });

  setTimeout(() => {
    popups.forEach((p) => p.remove());
  }, 5000);
};

const UserMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const location = userLocationStore((state) => state.location);
  const { data } = useUserDustbinData();

  useEffect(() => {
    if (!location) return;

    const map = mapBoxConfiguration(mapContainerRef, location);
    if (data) {
      handleMapLoad(map, data);
    }

    return () => map.remove();
  }, [data, location]);

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-hidden">
      <h1 className={`${DEFAULT_ITEM_PROPERTIES.heading.heading2} " mb-4`}>
        EcoBin Map
      </h1>
      <h1>
        Your Location: Latitude: {location?.latitude || "Loading..."},
        Longitude: {location?.longitude || "Loading..."},
      </h1>
      <div className="relative">
        <div
          ref={mapContainerRef}
          className="h-[calc(100vh-230px)] w-full rounded-lg shadow-md"
        />
      </div>
    </main>
  );
};

export default UserMap;
