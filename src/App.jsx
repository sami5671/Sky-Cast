import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UseGetLocation from "./Hooks/UseGetLocation";

import { setWeatherData } from "./features/weather/weatherSlice";
import MyWeather from "./components/my-weather/MyWeather";
import TemperatureGraph from "./components/temperature-graph/TemperatureGraph";
import WeekWeather from "./components/week-weather/WeekWeather";
import WindVisibility from "./components/wind-visibility/WindVisibility";
import { useGetWeatherQuery } from "./features/weather/weatherApi";

function App() {
  const { latitude, longitude, error: locationError } = UseGetLocation();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetWeatherQuery(
    { latitude, longitude },
    { skip: !latitude || !longitude }
  );

  useEffect(() => {
    if (data) {
      dispatch(setWeatherData(data));
    }
  }, [data, dispatch]);

  if (locationError)
    return <p className="text-red-500">Location error: {locationError}</p>;
  if (isLoading) return <p className="text-gray-400">Loading weather...</p>;
  if (error) return <p className="text-red-500">Error fetching weather</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-[#060C1A] text-white h-screen-full">
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
  );
}

export default App;
