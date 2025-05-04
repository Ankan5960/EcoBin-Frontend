import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { URLs } from "@/URLs/urls";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AdminFormInputs = {
  dustbinType: string;
};

type ApiResponseError = {
  error: string;
  message?: string;
};

const AdminPanel: React.FC = () => {
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

  const onSubmit: SubmitHandler<AdminFormInputs> = async (data) => {
    setResponseMessage("");
    setResponseType(null);

    try {
      const res = await fetch(URLs.EcoBin_Sensor_Data_Service+"/AdminSetup/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        const successResult = result;
        setResponseMessage(successResult);
        setResponseType("success");
        reset();
      } else {
        const errorResult = result as ApiResponseError;
        setResponseMessage(
          errorResult.error || errorResult.message || `Error: ${res.statusText}`
        );
        setResponseType("error");
      }
    } catch (err) {
      console.error("API Call Failed:", err);
      setResponseMessage("Network error or failed to connect to the server.");
      setResponseType("error");
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
      <div className="max-w-2xl mx-auto">
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

export default AdminPanel;
