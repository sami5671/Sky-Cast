// weatherSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,
  temp: 0,
  low: 0,
  high: 0,
  date: "",
  day: "",
  weatherMain: "",
  feelsLike: "",
  country: "",
  sunset: "",
  sunrise: "",
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.weather = action.payload;

      // city data

      if (action.payload?.city) {
        const cityData = action.payload.city;
        // ✅ Convert sunrise + sunset from Unix timestamp
        if (cityData.sunrise) {
          const sunriseDate = new Date(cityData.sunrise * 1000);
          state.sunrise = sunriseDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
        }
        if (cityData.sunset) {
          const sunsetDate = new Date(cityData.sunset * 1000);
          state.sunset = sunsetDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
        }
        if (cityData.country) {
          const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
          state.country = regionNames.of(cityData.country);
        }
      }

      // ✅ extract the first forecast entry (list[0])
      if (action.payload?.list && action.payload.list.length > 0) {
        const first = action.payload.list[0];

        state.temp = first.main.temp;
        state.low = first.main.temp_min;
        state.high = first.main.temp_max;
        state.feelsLike = first.main.feels_like;
        state.weatherMain = first.weather[0].main;

        // ✅ use dt_txt instead of dt
        const date = new Date(first.dt_txt);

        // format date like "14 Sep, 2025"
        const day = date.toLocaleString("en-US", { day: "2-digit" });
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();

        state.date = `${day} ${month}, ${year}`; // "14 Sep, 2025"
        state.day = date.toLocaleDateString("en-US", { weekday: "long" }); // "Sunday"
      }
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;

export default weatherSlice.reducer;
