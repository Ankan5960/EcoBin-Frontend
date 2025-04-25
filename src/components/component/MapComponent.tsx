import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CatagoryEntity, DustbinData, SensorData } from "@/types/DustbinTypes";

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

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11", // You can change the style
      center: [88.3639, 22.5726], // Set to your location (Longitude, Latitude)
      zoom: 12, // Adjust zoom level
    });

    // Add zoom and rotation controls
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl());

    map.on("load", () => {
      fetch("/data/marker.json") // Ensure this file is served in the public directory
        .then((response) => response.json())
        .then((data) => {
          console.log("Marker data:", data); // Log the data to check its structure
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
              .setPopup(popup) // Add a popup with title
              .addTo(map);

            popups.push(popup);
          });

          // Auto-close all popups after 5 seconds
          setTimeout(() => {
            popups.forEach((p) => p.remove());
          }, 5000);
        })
        .catch((error) => console.error("Error loading markers:", error));
    });

    return () => map.remove();
  }, []);

  return (
    <div className="relative">
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="h-[600px] w-full rounded-lg shadow-md"
      />
    </div>
  );
};

export default MapComponent;
