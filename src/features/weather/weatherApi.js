// features/weather/weatherApi.js
import { apiSlice } from "./../api/apiSlice";

const API_KEY = import.meta.env.VITE_WEATHER_API_APP_ID;

export const weatherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({ latitude, longitude }) =>
        `forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
