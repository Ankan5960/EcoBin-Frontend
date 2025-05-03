import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  CatagoryEntity,
  DustbinData,
  LocationData,
  SensorData,
} from "@/types/dustbinTypes";
import useLocationStore from "@/store/useUserLocationStore";

const generatePopupContent = (
  sensorData: SensorData,
  category: CatagoryEntity
): string => {
  return `
    <div style="padding: 8px; background: white; font-size: 15px; color: black; border-radius: 5px;">
      <strong>Weight:</strong> ${sensorData.weightData}<br/>
      <strong>Air Quality:</strong> ${sensorData.airQualityData}<br/>
      <strong>Fill:</strong> ${sensorData.levelFillData}<br/>
      <strong>Category:</strong> ${category.catagoryName}
    </div>
  `;
};

const mapBoxConfiguration = (
  mapContainerRef: React.RefObject<HTMLDivElement | null>,
  userLocation: LocationData | null
) => {
  if (!mapContainerRef.current) {
    throw new Error("Map container not ready");
  }

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const map = new mapboxgl.Map({
    container: mapContainerRef.current!,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [Number(userLocation?.longitude), Number(userLocation?.latitude)],
    zoom: 12,
  });

  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(new mapboxgl.GeolocateControl());

  return map;
};

const handleMapLoad = async (map: mapboxgl.Map) => {
  map.on("load", () => {
    fetch("./data/marker.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Marker data:", data);
        const popups: mapboxgl.Popup[] = [];

        data.forEach((marker: DustbinData) => {
          const popup = new mapboxgl.Popup().setHTML(
            generatePopupContent(marker.sensorData, marker.category)
          );

          new mapboxgl.Marker({
            color: "red",
          })
            .setLngLat([
              Number(marker.location.longitude),
              Number(marker.location.latitude),
            ])
            .setPopup(popup)
            .addTo(map);

          popups.push(popup);
        });

        setTimeout(() => {
          popups.forEach((p) => p.remove());
        }, 5000);
      })
      .catch((error) => console.error("Error loading markers:", error));
  });
};

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const city = useLocationStore((state) => state.city);
  const location = useLocationStore((state) => state.location);

  useEffect(() => {
    const map = mapBoxConfiguration(mapContainerRef, location);
    handleMapLoad(map);

    return () => map.remove();
  }, [handleMapLoad, location]);

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-hidden">
      <h1 className={`${DEFAULT_ITEM_PROPERTIES.heading.heading2} " mb-4`}>
        EcoBin Map
      </h1>
      <h1>Your City: {city || "Loading..."}</h1>
      <h1>
        Your Location: Latitude: {location?.latitude || "Loading..."},
        Longitude: {location?.longitude || "Loading..."}
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

export default Map;
