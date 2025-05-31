import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AdminFormInputs } from "@/models/admin-api-models";
import axios from "axios";
import { AdminSetUpService } from "./admin-setup.service";
import { DustbinDetailsDataModel } from "@/components/dustbin-data/dustbin-data-model";

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')       // insert space before capital letters
    .replace(/^./, str => str.toUpperCase()); // capitalize first letter
}

const AdminSetup: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminFormInputs>();

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseType, setResponseType] = useState<"success" | "error" | null>(
    null
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [fetchedData, setFetchedData] =
    useState<DustbinDetailsDataModel | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const adminSetUpService = new AdminSetUpService();

  const onSubmit: SubmitHandler<AdminFormInputs> = async (data) => {
    setResponseMessage("");
    setResponseType(null);

    try {
      const res = await adminSetUpService.postSetup(data);
      setResponseMessage(res.data.dustbinId); // Assuming the response is a string or message
      setResponseType("success");
      reset();
    } catch (err) {
      console.error("postSetup Call Failed:", err);
      setResponseType("error");
    }
  };

  const handleFetch = async (dustbinId: string) => {
    setFetchedData(null);
    setFetchError(null);
    setDeleteMessage("");
    setDeleteError(null);
    try {
      const response = await adminSetUpService.getSetup(dustbinId);
      setFetchedData(response.data);
    } catch (error) {
      console.error("Failed to fetch setup:", error);
      if (axios.isAxiosError(error)) {
        setFetchError(error.response?.data?.message || "Failed to fetch data.");
      } else {
        setFetchError("An unexpected error occurred.");
      }
    }
  };

  const handleDelete = async (dustbinId: string) => {
    setDeleteMessage("");
    setDeleteError(null);
    setFetchedData(null);
    setFetchError(null);
    try {
      const response = await adminSetUpService.deleteSetup(dustbinId);
      setDeleteMessage(response.data.message); // Assuming it's a string message
    } catch (error) {
      console.error("Failed to delete setup:", error);
      if (axios.isAxiosError(error)) {
        setDeleteError(
          error.response?.data?.message || "Failed to delete setup."
        );
      } else {
        setDeleteError("An unexpected error occurred.");
      }
    }
  };

  const handleCopy = () => {
    if (!responseMessage || responseType !== "success") return;

    navigator.clipboard
      .writeText(responseMessage)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        <div
          className={`${DEFAULT_ITEM_PROPERTIES.heading.heading2} mb-6 text-center md:text-left text-gray-700`}
        >
          Admin Setup: New Dustbin
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <div>
            <label
              htmlFor="dustbinType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Dustbin Type
            </label>
            <select
              id="dustbinType"
              {...register("dustbinType", {
                required: "Please select a dustbin type.",
              })}
              className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out ${
                errors.dustbinType ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.dustbinType ? "true" : "false"}
            >
              <option value="">-- Select Dustbin Type --</option>
              <option value="Dry waste">Dry waste</option>
              <option value="Wet waste">Wet waste</option>
            </select>
            {errors.dustbinType && (
              <p className="text-red-600 text-xs mt-1" role="alert">
                {errors.dustbinType.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating ID...
              </>
            ) : (
              "Generate Dustbin ID"
            )}
          </button>
        </form>

        {responseMessage && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div
              className={`${DEFAULT_ITEM_PROPERTIES.heading.heading3} mb-3 ${
                responseType === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {responseType === "success" ? "Generated Dustbin ID" : "Error"}
            </div>
            <div
              className={`mt-2 p-3 rounded text-sm flex items-center justify-between gap-4 ${
                responseType === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <span
                className={`break-all font-mono ${
                  responseType === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {responseMessage}
              </span>
              {responseType === "success" && (
                <button
                  onClick={handleCopy}
                  className="ml-auto flex-shrink-0 text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium px-2 py-1 rounded border border-transparent hover:border-blue-300 transition duration-150 ease-in-out"
                  aria-label="Copy Dustbin ID"
                >
                  {isCopied ? "Copied!" : "Copy ID"}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div
            className={`${DEFAULT_ITEM_PROPERTIES.heading.heading3} mb-3 text-gray-700`}
          >
            Fetch Dustbin Details
          </div>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Enter Dustbin ID to fetch"
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out border-gray-300"
              id="fetchId"
            />

            <button
              onClick={() => {
                const fetchIdInput = document.getElementById(
                  "fetchId"
                ) as HTMLInputElement;
                if (fetchIdInput?.value) {
                  handleFetch(fetchIdInput.value);
                } else {
                  setFetchError("Please enter a Dustbin ID to fetch.");
                  setFetchedData(null);
                  setDeleteMessage("");
                  setDeleteError(null);
                }
              }}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Fetch
            </button>
          </div>

          {fetchError && (
            <p className="text-red-600 text-sm mt-2" role="alert">
              {fetchError}
            </p>
          )}

          {fetchedData && (
            <div className="mt-4 p-4 rounded-md bg-gray-50 border border-gray-200">
              <h4
                className={`${DEFAULT_ITEM_PROPERTIES.heading.heading4} mb-2 text-gray-800`}
              >
                Dustbin Details:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(fetchedData).map(([key, value]) => (
                  <div
                    key={key}
                    className={`py-2 ${
                      key === "addressName" ? "col-span-full" : ""
                    }`}
                  >
                    <strong className="font-semibold text-gray-700">
                      {formatLabel(key)}:
                    </strong>{" "}
                    <span className="text-gray-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* {fetchedData && (
            <div className="mt-4 p-4 rounded-md bg-gray-50 border border-gray-200">
              <h4
                className={`${DEFAULT_ITEM_PROPERTIES.heading.heading4} mb-2 text-gray-800`}
              >
                Dustbin Details:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Dustbin ID:
                  </strong>{" "}
                  <span className="text-gray-600">{fetchedData.dustbinId}</span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Location ID:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.locationDataId}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Latitude:
                  </strong>{" "}
                  <span className="text-gray-600">{fetchedData.latitude}</span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Longitude:
                  </strong>{" "}
                  <span className="text-gray-600">{fetchedData.longitude}</span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Region ID:
                  </strong>{" "}
                  <span className="text-gray-600">{fetchedData.regionId}</span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Country:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.countryName}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Region:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.regionName}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    District:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.districtName}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Place:
                  </strong>{" "}
                  <span className="text-gray-600">{fetchedData.placeName}</span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Locality:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.localityName}
                  </span>
                </div>
                <div className="py-2 col-span-full">
                  <strong className="font-semibold text-gray-700">
                    Address:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.addressName}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Pin Code:
                  </strong>{" "}
                  <span className="text-gray-600">{fetchedData.pinCode}</span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Sensor ID:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.sensorDataId}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Weight Data:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.weightData}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Air Quality:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.airQualityData}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Fill Level:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.levelFillData}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Category ID:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.categoryId}
                  </span>
                </div>
                <div className="py-2">
                  <strong className="font-semibold text-gray-700">
                    Category Name:
                  </strong>{" "}
                  <span className="text-gray-600">
                    {fetchedData.categoryName}
                  </span>
                </div>
              </div>
            </div>
          )} */}

        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div
            className={`${DEFAULT_ITEM_PROPERTIES.heading.heading3} mb-3 text-red-700`}
          >
            Delete Dustbin Setup
          </div>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Enter Dustbin ID to delete"
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out border-gray-300"
              id="deleteId"
            />
            <button
              onClick={() => {
                const deleteIdInput = document.getElementById(
                  "deleteId"
                ) as HTMLInputElement;
                if (deleteIdInput?.value) {
                  handleDelete(deleteIdInput.value);
                } else {
                  setDeleteError("Please enter a Dustbin ID to delete.");
                  setDeleteMessage("");
                  setFetchedData(null);
                  setFetchError(null);
                }
              }}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              Delete
            </button>
          </div>
          {deleteError && (
            <p className="text-red-600 text-sm mt-2" role="alert">
              {deleteError}
            </p>
          )}
          {deleteMessage && (
            <p className="text-green-600 text-sm mt-2" role="alert">
              {deleteMessage}
            </p>
          )}
        </div>



        {isCopied && (
          <div className="fixed bottom-4 right-4 z-50 w-auto max-w-xs sm:max-w-sm">
            <Alert variant="success" className="shadow-lg">
              <AlertTitle>Copied!</AlertTitle>
              <AlertDescription>
                Dustbin ID copied to clipboard.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSetup;
