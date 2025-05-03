const CACHE_KEY = 'dustbin_data';

export const getDustbinData = async (lat: number, lng: number) => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch(`http://localhost:5274/api/DustbinData/get-dustbin-data?Latitude=${lat}&Longitude=${lng}`);
  const data = await response.json();

  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
};
