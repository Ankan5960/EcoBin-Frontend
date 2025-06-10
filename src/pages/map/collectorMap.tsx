import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import userLocationStore from "@/store/userLocationStore";
import { useCollectorDustbinData } from "@/hooks/useCollectorDustbinData";
import type { Feature, GeoJsonProperties, Geometry } from "geojson";
import { Button } from "@mui/material";
import {
  CategoryEntity,
  DustbinData,
  LocationData,
  SensorData,
} from "@/components/dustbin-data/dustbin-data-model";
import { DustbinDataService } from "@/components/dustbin-data/dustbin-data.service";

const generatePopupContent = (
  isDangrouse: boolean | null,
  sensorData: SensorData,
  category: CategoryEntity,
  dustbinId: string
): string => {
  return `
    <div style="padding: 8px; ${
      isDangrouse ? "background: red;" : "background: white;"
    } font-size: 15px; color: black; border-radius: 5px;">
      <strong>Dustbin ID:</strong> ${dustbinId}<br/>
      <strong>Weight:</strong> ${sensorData.weightData}<br/>
      <strong>Air Quality:</strong> ${sensorData.airQualityData}<br/>
      <strong>Fill:</strong> ${sensorData.levelFillData}<br/>
      <strong>Category:</strong> ${category.categoryName}<br/>
      <strong>Danger:</strong> ${isDangrouse}
    </div>
  `;
};

const mapBoxConfiguration = (
  mapContainerRef: React.RefObject<HTMLDivElement | null>,
  userLocation: LocationData | null
  //mapboxApiKey: string | null
): mapboxgl.Map => {
  if (!mapContainerRef.current) {
    throw new Error("Map container not ready");
  }

  //mapboxgl.accessToken = mapboxApiKey;
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [
      Number(userLocation?.longitude ?? 0),
      Number(userLocation?.latitude ?? 0),
    ],
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
      generatePopupContent(data.isDangrouse, data.sensorData, data.category, data.dustbinId)
    );

    const markerColor = data.isDangrouse ? "red" : "blue";

    new mapboxgl.Marker({ color: markerColor })
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

const handleRoutes = async (
  dustbinService: DustbinDataService,
  map: mapboxgl.Map,
  dustbindata: DustbinData[] | null,
  localityName: string,
  latitude: string,
  longitude: string
) => {
  const res = await dustbinService.fetchCollectRoute({
    localityName,
    latitude,
    longitude,
  });
  const data = res.data.routes[0];
  const geojson: Feature<Geometry, GeoJsonProperties> = {
    type: "Feature",
    properties: {},
    geometry: data.geometry as Geometry,
  };

  if (map.getSource("route")) {
    (map.getSource("route") as mapboxgl.GeoJSONSource).setData(geojson);
  } else {
    map.addSource("route", {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
  }

  const start = [Number(longitude), Number(latitude)];
  map.addLayer({
    id: "origin-circle",
    type: "circle",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: start,
            },
          },
        ],
      },
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "#4ce05b",
    },
  });

  let index = 0;
  dustbindata?.forEach((dustbin: DustbinData) => {
    if (dustbin.isDangrouse) {
      const coords = [
        Number(dustbin.location.longitude),
        Number(dustbin.location.latitude),
      ];
      const layerId = `destination-circle-${index}`;

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: coords,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 15,
            "circle-color": "#f30",
          },
        });
      }
    }
    index++;
  });
};

const CollectorMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const location = userLocationStore((state) => state.location);
  const { data } = useCollectorDustbinData("new town");
  const dustbinService = useMemo(() => new DustbinDataService(), []);

  useEffect(() => {
    if (!location) return;

    const initializedMap = mapBoxConfiguration(mapContainerRef, location);
    setMap(initializedMap);

    if (data) {
      handleMapLoad(initializedMap, data);
    }

    return () => initializedMap.remove();
  }, [data, location]);

  return (
    <main className="flex-1 p-4 bg-gray-100 overflow-hidden">
      <h1 className={`${DEFAULT_ITEM_PROPERTIES.heading.heading2} mb-4`}>
        EcoBin Collector Map
      </h1>
      {/* <p>
        Your Location: Latitude: {location?.latitude || "Loading..."},
        Longitude: {location?.longitude || "Loading..."}
      </p> */}

      <div className="relative">
        <div
          ref={mapContainerRef}
          className="h-[calc(100vh-270px)] w-full rounded-lg shadow-md"
        />
      </div>
      <div className="mt-2"></div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          if (location && map) {
            handleRoutes(
              dustbinService,
              map,
              data,
              "new town",
              location.latitude.toString(),
              location.longitude.toString()
            );
          }
        }}
      >
        Show Collection Route
      </Button>
    </main>
  );
};

export default CollectorMap;
