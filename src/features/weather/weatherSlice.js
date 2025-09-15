// features/weather/weatherSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,
  filterWeather: [],
  temp: 0,
  low: 0,
  high: 0,
  date: "",
  day: "",
  weatherMain: "",
  tomorrowWeatherMain: "",
  tomorrowWeatherDescription: "",
  tomorrowTemp: 0,
  feelsLike: "",
  country: "",
  cityName: "",
  sunset: "",
  sunrise: "",
  temperatureWeekly: {},
  windVisibility: {},
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weather = action.payload;

      if (action.payload?.city) {
        const cityData = action.payload.city;

        state.cityName = cityData.name;

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

      if (action.payload?.list && action.payload.list.length > 0) {
        const first = action.payload.list[0];

        state.temp = first.main.temp;
        state.low = first.main.temp_min;
        state.high = first.main.temp_max;
        state.feelsLike = first.main.feels_like;
        state.weatherMain = first.weather[0].main;

        const date = new Date(first.dt_txt);
        state.date = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        state.day = date.toLocaleDateString("en-US", { weekday: "long" });

        const targetDate = first.dt_txt.split(" ")[0];
        state.filterWeather = action.payload.list.filter((item) =>
          item.dt_txt.startsWith(targetDate)
        );

        const tomorrowItem = action.payload.list.find(
          (item) => item.dt_txt.split(" ")[0] !== targetDate
        );
        if (tomorrowItem) {
          state.tomorrowWeatherMain = tomorrowItem.weather[0].main;
          state.tomorrowWeatherDescription =
            tomorrowItem.weather[0].description;
          state.tomorrowTemp = tomorrowItem.main.temp;
        }

        const weekly = {};
        action.payload.list.forEach((item) => {
          const d = new Date(item.dt_txt);
          const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
          const hour = d.getHours();

          if (!weekly[weekday]) {
            weekly[weekday] = {
              temps: [],
              humidities: [],
              chosenTemp: null,
              chosenHumidity: null,
            };
          }

          weekly[weekday].temps.push(item.main.temp);
          weekly[weekday].humidities.push(item.main.humidity);

          if (hour === 12) {
            weekly[weekday].chosenTemp = item.main.temp;
            weekly[weekday].chosenHumidity = item.main.humidity;
          }
        });

        const result = {};
        Object.keys(weekly).forEach((day) => {
          const w = weekly[day];
          const temp =
            w.chosenTemp !== null
              ? w.chosenTemp
              : Math.round(w.temps.reduce((a, b) => a + b, 0) / w.temps.length);
          const humidity =
            w.chosenHumidity !== null
              ? w.chosenHumidity
              : Math.round(
                  w.humidities.reduce((a, b) => a + b, 0) / w.humidities.length
                );
          result[day] = { temp, humidity };
        });

        state.temperatureWeekly = result;
      }

      // 🌬️ Weekly Visibility + Wind
      const windVis = {};
      action.payload.list.forEach((item) => {
        const d = new Date(item.dt_txt);
        const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
        const hour = d.getHours();

        if (!windVis[weekday]) {
          windVis[weekday] = {
            visibilities: [],
            winds: [], // wind speeds
            chosenVisibility: null,
            chosenWind: null,
          };
        }

        windVis[weekday].visibilities.push(item.visibility);
        windVis[weekday].winds.push(item.wind.speed);

        if (hour === 12) {
          windVis[weekday].chosenVisibility = item.visibility;
          windVis[weekday].chosenWind = item.wind.speed;
        }
      });

      // ✅ Finalize
      const windVisResult = {};
      Object.keys(windVis).forEach((day) => {
        const w = windVis[day];

        const visibility =
          w.chosenVisibility !== null
            ? w.chosenVisibility
            : Math.round(
                w.visibilities.reduce((a, b) => a + b, 0) /
                  w.visibilities.length
              );

        const wind =
          w.chosenWind !== null
            ? w.chosenWind
            : Math.round(w.winds.reduce((a, b) => a + b, 0) / w.winds.length);

        windVisResult[day] = { visibility, wind };
      });

      state.windVisibility = windVisResult;
    },
    // filter data by date
    setFilterByDate: (state, action) => {
      const targetDate = action.payload;
      state.filterWeather = state.weather.list.filter((item) => {
        return item.dt_txt.startsWith(targetDate);
      });
    },
    // ✅ Reset everything to initialState
    resetWeatherState: () => {
      return initialState;
    },
  },
});

export const { setWeatherData, setFilterByDate, resetWeatherState } =
  weatherSlice.actions;
export default weatherSlice.reducer;
