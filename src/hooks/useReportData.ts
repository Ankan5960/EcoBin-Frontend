import { fetchReportData } from "@/api/axios";
import type { ReportDataResponse } from "@/types/reportTypes";
import { useEffect, useState } from "react";

export const useReportData = () => {
  const [data, setData] = useState<ReportDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchReportData();
        setData(res);
      } catch (err) {
        console.error("Error feaching ReportData", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  },[]);

  return {data, loading};
};
