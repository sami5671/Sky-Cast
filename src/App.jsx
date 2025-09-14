import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherFailure,
  fetchWeatherStart,
  fetchWeatherSuccess,
} from "./features/weather/weatherSlice";
import UseGetLocation from "./Hooks/UseGetLocation";
import { useEffect } from "react";
import MyWeather from "./components/my-weather/MyWeather";
import TemperatureGraph from "./components/temperature-graph/TemperatureGraph";
import WeekWeather from "./components/week-weather/WeekWeather";
import WindVisibility from "./components/wind-visibility/WindVisibility";
function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_APP_ID;
  const { latitude, longitude, error: locationError } = UseGetLocation();
  const dispatch = useDispatch();
  const { weather, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeather = async () => {
        try {
          dispatch(fetchWeatherStart());
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await response.json();
          dispatch(fetchWeatherSuccess(data));
        } catch (err) {
          dispatch(fetchWeatherFailure(err.message));
        }
      };

      fetchWeather();
    }
  }, [latitude, longitude, dispatch]);

  return (
    <div>
      {/* main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 bg-[#060C1A] text-white h-screen">
        <div>
          <MyWeather />
        </div>
        <div>
          <TemperatureGraph />
        </div>
        <div>
          <WeekWeather />
        </div>
        <div>
          <WindVisibility />
        </div>
      </div>
      {/* main  */}
    </div>
  );
}

export default App;
