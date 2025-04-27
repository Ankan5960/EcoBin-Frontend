import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  CatagoryEntity,
  DustbinData,
  LocationData,
  SensorData,
} from "@/types/DustbinTypes";
import { useUserLocationStore } from "@/store/useUserLocationStore";

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

const getUserLocation = (
  setUserLocation: (location: LocationData) => void
): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
        setUserLocation({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
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
    center: [
      Number(userLocation?.longitude) || 88.3639,
      Number(userLocation?.latitude) || 22.5726,
    ],
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

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { userLocation, setUserLocation } = useUserLocationStore();

  useEffect(() => {
    const map = mapBoxConfiguration(mapContainerRef, userLocation);

    handleMapLoad(map);

    if (!userLocation) {
      getUserLocation(setUserLocation);
    }

    return () => map.remove();
  }, []);

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className="h-[600px] w-full rounded-lg shadow-md"
      />
    </div>
  );
};

export default MapComponent;
