export async function getCityCoordinates(city) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_APP_ID;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${API_KEY}`
    );

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("City not found");
    }

    const { lat, lon } = data[0];
    return { latitude: lat, longitude: lon };
  } catch (error) {
    console.error(error);
    return null;
  }
}
