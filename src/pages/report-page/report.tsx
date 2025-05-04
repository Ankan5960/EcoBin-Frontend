import type React from "react";
import { BarChart3, PieChart, Trash2, Leaf, Download } from "lucide-react"; // Example icons
import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { DoughnutChart } from "./doughnutchart";
import { BarChart } from "./barchart";
import { useReportData } from "@/hooks/useReportData";
import { calculateEnvironmentalImpact } from "@/utility/environmental";
import { downloadAsPdf } from "@/utility/downloadAsPdf";

const summaryData = {
  totalCollected: 12580, // kg
  recyclingRate: 65, // percentage
  collectionsToday: 45,
  activeBins: 180,
};

const statuses = [
  { statusName: "High Risk", statusValue: 20 }, // red-500
  { statusName: "Moderate Risk", statusValue: 30 }, // amber-500
  { statusName: "Low Risk", statusValue: 50 }, // blue-500
];

const Report: React.FC = () => {
  const { data } = useReportData();

  let entries: { categoryName: string; count: number }[] | undefined;

  if (data?.categories) {
    entries = Object.entries(data.categories).map(([key, value]) => ({
      categoryName: key,
      count: value,
    }));
  }
  const { co2EmissionSaved, treesSaved } = calculateEnvironmentalImpact(
    Number(data?.totalAirQualityData)
  );

  const handleDownloadReport = async (reportType: string) => {
    await downloadAsPdf(
      "report-section",
      reportType.replace(/\s+/g, "_").toLowerCase()
    );
  };

  return (
    <div id="report-section" className=" w-full">
      <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1
              className={`${DEFAULT_ITEM_PROPERTIES.heading.heading2} text-green-700`}
            >
              EcoBin Reports Dashboard
            </h1>
            {/* Optional: Date Range Selector or Filter */}
            <div>
              {/* Placeholder for filters */}
              <button
              type="button"
                onClick={() => handleDownloadReport("Full Summary")}
                className="inline-flex items-center px-4 py-2 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Summary
              </button>
            </div>
          </div>

          {/* Section 1: Summary Cards */}
          <div className="mb-8 md:mb-12">
            <h2
              className={`${DEFAULT_ITEM_PROPERTIES.heading.heading3} mb-4 text-gray-700`}
            >
              Overall Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Card 1: Total Collected */}
              <div className="bg-white p-5 rounded-lg shadow border border-gray-200 flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Trash2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Total Waste in Dustbin
                  </p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {data?.totalWeightData} kg
                  </p>
                </div>
              </div>
              {/* Card 2: Recycling Rate */}
              <div className="bg-white p-5 rounded-lg shadow border border-gray-200 flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recycling Rate</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {summaryData.recyclingRate}%
                  </p>
                </div>
              </div>
              {/* Card 3: Collections Today */}
              <div className="bg-white p-5 rounded-lg shadow border border-gray-200 flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Dustbins</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {data?.totalDustbins}
                  </p>
                </div>
              </div>
              {/* Card 4: Active Bins */}
              <div className="bg-white p-5 rounded-lg shadow border border-gray-200 flex items-center space-x-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  {/* Replace with a suitable icon if available */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <title>Active Bins Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Bins</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {data?.totalActiveDustbins}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3
                className={`${DEFAULT_ITEM_PROPERTIES.heading.heading4} mb-4 flex items-center justify-between`}
              >
                <span>
                  <PieChart className="inline-block mr-2 h-5 w-5 text-gray-500" />
                  Waste Types
                </span>
                <button
                type="button"
                  onClick={() => handleDownloadReport("Waste Breakdown")}
                  className="text-xs text-green-600 hover:underline"
                >
                  Download
                </button>
              </h3>
              <div className="h-64 w-full flex my-7 items-center justify-center text-gray-400 bg-gray-50 rounded">
                <div className="text-center">
                  <DoughnutChart dustbinCategoryList={entries || []} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3
                className={`${DEFAULT_ITEM_PROPERTIES.heading.heading4} mb-4 flex items-center justify-between`}
              >
                <span>
                  <BarChart3 className="inline-block mr-2 h-5 w-5 text-gray-500" />
                  Collection Trends (Last 7 Days)
                </span>
                <button
                type="button"
                  onClick={() => handleDownloadReport("Collection Trends")}
                  className="text-xs text-green-600 hover:underline"
                >
                  Download
                </button>
              </h3>
              <div className="h-64 w-full flex items-center justify-center text-gray-400 bg-gray-50 rounded">
                <BarChart dustbinStatusList={statuses} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200 lg:col-span-2">
              <h3
                className={`${DEFAULT_ITEM_PROPERTIES.heading.heading4} mb-4 flex items-center justify-between`}
              >
                <span>
                  <Leaf className="inline-block mr-2 h-5 w-5 text-gray-500" />
                  Environmental Impact
                </span>
                <button
                  type="button"
                  onClick={() => handleDownloadReport("Environmental Impact")}
                  className="text-xs text-green-600 hover:underline"
                >
                  Download
                </button>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <p className="text-sm text-green-700">
                    CO₂ Emission Saved (Est.)
                  </p>
                  <p className="text-xl font-semibold text-green-800">
                  {Number.isNaN(co2EmissionSaved) ? "0" : co2EmissionSaved} kg
                  </p>
                </div>
                <div className="bg-lime-50 p-4 rounded-md border border-lime-200">
                  <p className="text-sm text-lime-700">
                    Trees Saved (Equivalent)
                  </p>
                  <p className="text-xl font-semibold text-lime-800">
                  {Number.isNaN(treesSaved) ? "0" : treesSaved} kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
