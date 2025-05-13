import React, { useState, useEffect } from "react";
import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";

interface UserSettings {
  displayName: string;
  email: string;
  binFullAlerts: boolean;
  // ... other user settings
}

interface BinSettings {
  [binId: string]: {
    name: string;
    capacity: number;
    // ... other bin settings
  };
}

const Settings: React.FC = () => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [binSettings, setBinSettings] = useState<BinSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching settings data from an API
    setTimeout(() => {
      const mockUserSettings: UserSettings = {
        displayName: "John Doe",
        email: "john.doe@example.com",
        binFullAlerts: true,
      };
      const mockBinSettings: BinSettings = {
        "bin-123": { name: "Kitchen Bin", capacity: 20 },
        "bin-456": { name: "Recycling Bin", capacity: 30 },
      };
      setUserSettings(mockUserSettings);
      setBinSettings(mockBinSettings);
      setLoading(false);
    }, 1000); // Simulate loading time
  }, []);

  const handleInputChange = (
    section: string,
    field: string,
    value: unknown | null,
    binId?: string
  ) => {
    // Update the relevant state based on the input change
    if (section === "user") {
      setUserSettings(
        (prevSettings) => ({ ...prevSettings, [field]: value } as UserSettings)
      );
    } else if (section === "bin" && binId && binSettings) {
      setBinSettings((prevSettings) => ({
        ...prevSettings,
        //[binId]: { ...prevSettings[binId], [field]: value },
      }));
    }
  };

  const handleSaveSettings = () => {
    // Implement API calls to save the updated settings
    console.log("Saving user settings:", userSettings);
    console.log("Saving bin settings:", binSettings);
    // Optionally provide feedback to the user (e.g., "Settings saved successfully")
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div>Error loading settings: {error}</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h1 className={`${DEFAULT_ITEM_PROPERTIES.heading.heading2}`}>
        Settings
      </h1>

      {userSettings && (
        <div className="mt-6">
          <h2 className={DEFAULT_ITEM_PROPERTIES.heading.heading4}>
            User Profile
          </h2>
          <div className="mt-2 space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="displayName"
              >
                Display Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="displayName"
                type="text"
                value={userSettings.displayName}
                onChange={(e) =>
                  handleInputChange("user", "displayName", e.target.value)
                }
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={userSettings.email}
                readOnly // Or provide functionality to update
              />
            </div>
            {/* Add more user profile settings here */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bin Full Alerts
              </label>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={userSettings.binFullAlerts}
                onChange={(e) =>
                  handleInputChange("user", "binFullAlerts", e.target.checked)
                }
              />
            </div>
          </div>
        </div>
      )}

      {binSettings &&
        Object.entries(binSettings).map(([binId, settings]) => (
          <div key={binId} className="mt-6">
            <h2 className={DEFAULT_ITEM_PROPERTIES.heading.heading4}>
              {settings.name} Configuration
            </h2>
            <div className="mt-2 space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`binName-${binId}`}
                >
                  Bin Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`binName-${binId}`}
                  type="text"
                  value={settings.name}
                  onChange={(e) =>
                    handleInputChange("bin", "name", e.target.value, binId)
                  }
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`binCapacity-${binId}`}
                >
                  Capacity (e.g., in liters)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`binCapacity-${binId}`}
                  type="number"
                  value={settings.capacity}
                  onChange={(e) =>
                    handleInputChange(
                      "bin",
                      "capacity",
                      parseInt(e.target.value),
                      binId
                    )
                  }
                />
              </div>
              {/* Add more bin-specific settings here */}
            </div>
          </div>
        ))}

      <div className="mt-8">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSaveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
