import { DustbinData } from "@/types/dustbinTypes";
import React, { useEffect } from "react";

interface DustbinFetcherProps {
  onDataLoaded: (data: DustbinData[]) => void;
}

const DustbinFetcher: React.FC<DustbinFetcherProps> = ({ onDataLoaded }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `http://localhost:5274/api/DustbinData/get-dustbin-data?Latitude=${latitude}&Longitude=${longitude}`;

        fetch(url)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch data");
            return res.json();
          })
          .then((data: DustbinData[]) => {
            onDataLoaded(data); // Pass to parent
          })
          .catch((error) => {
            console.error("Error fetching dustbin data:", error);
          });
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, [onDataLoaded]);

  return null; // This component only fetches data
};

export default DustbinFetcher;
