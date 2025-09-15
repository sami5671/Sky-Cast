import React, { useEffect, useState } from "react";
import thunderstormIcon from "../../assets/Images/Thunderstorm.json";
import drizzleIcon from "../../assets/Images/drizzle.json";
import rainIcon from "../../assets/Images/rainy.json";
import snowIcon from "../../assets/Images/Snowing.json";
import clearIcon from "../../assets/Images/clear.json";
import cloudsIcon from "../../assets/Images/cloudy icon.json";
import mistIcon from "../../assets/Images/mist.json";
import smokeIcon from "../../assets/Images/smoke.json";
import hazeIcon from "../../assets/Images/haze.json";
import dustIcon from "../../assets/Images/clear.json";
import fogIcon from "../../assets/Images/haze.json";
import sandIcon from "../../assets/Images/smoke.json";
import ashIcon from "../../assets/Images/cloudy icon.json";
import squallIcon from "../../assets/Images/cloudy icon.json";
import tornadoIcon from "../../assets/Images/Tornado.json";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import cloud from "../../assets/Images/cloud.png";
import { FaLocationDot } from "react-icons/fa6";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { getCityCoordinates } from "../shared/getlatitudelong";
import { useGetWeatherQuery } from "../../features/weather/weatherApi";
import {
  resetWeatherState,
  setWeatherData,
} from "../../features/weather/weatherSlice";
const MyWeather = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { data, error, isLoading } = useGetWeatherQuery(
    { latitude, longitude },
    { skip: !latitude || !longitude }
  );

  const {
    cityName,
    temp,
    low,
    high,
    date,
    day,
    country,
    weatherMain,
    feelsLike,
  } = useSelector((state) => state.weather);

  // ✅ Run when new data arrives
  useEffect(() => {
    if (data) {
      dispatch(resetWeatherState());
      dispatch(setWeatherData(data));
    }
  }, [data, dispatch]);

  const handleSearch = async () => {
    if (!city) return;

    const coords = await getCityCoordinates(city);
    if (coords) {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    } else {
      alert("City not found");
    }
  };

  return (
    <div className="bg-[#0E1421] p-12 rounded-2xl shadow-2xl h-full">
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-[#182643] w-1/2 shadow-2xl p-2 rounded-full text-white px-4"
          placeholder="🔍 Search city..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {isLoading ? (
          <button className="px-4 py-2 rounded-full shadow-lg text-white">
            <AiOutlineLoading3Quarters className="animate-spin" />
          </button>
        ) : (
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 rounded-full shadow-lg text-white bg-purple-600 font-bold"
          >
            Search
          </button>
        )}
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between ">
        {/* part 1 */}
        <div>
          <h1 className="bg-purple-600 w-fit p-2 rounded-full flex items-center gap-1 font-bold">
            <FaLocationDot />
            {cityName}, {country}
          </h1>
          <div className="flex items-center gap-8 mt-6">
            <div>
              <h1 className="text-5xl font-semibold">{day}</h1>
              <p className="text-sm mt-2">{date}</p>

              <h1 className="mt-10 text-5xl font-semibold">{temp}&deg; C</h1>
              <p className="text-sm mt-1">
                High: {high} Low: {low}
              </p>
            </div>
            <div>
              <img src={cloud} alt="" />
            </div>
          </div>
        </div>

        {/* part 2 */}
        <div>
          <div>
            {weatherMain === "Thunderstorm" ? (
              <Lottie
                animationData={thunderstormIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Drizzle" ? (
              <Lottie
                animationData={drizzleIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Rain" ? (
              <Lottie
                animationData={rainIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Snow" ? (
              <Lottie
                animationData={snowIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Clear" ? (
              <Lottie
                animationData={clearIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Clouds" ? (
              <Lottie
                animationData={cloudsIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Mist" ? (
              <Lottie
                animationData={mistIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Smoke" ? (
              <Lottie
                animationData={smokeIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Haze" ? (
              <Lottie
                animationData={hazeIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Dust" ? (
              <Lottie
                animationData={dustIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Fog" ? (
              <Lottie
                animationData={fogIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Sand" ? (
              <Lottie
                animationData={sandIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Ash" ? (
              <Lottie
                animationData={ashIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Squall" ? (
              <Lottie
                animationData={squallIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : weatherMain === "Tornado" ? (
              <Lottie
                animationData={tornadoIcon}
                loop={true}
                style={{ width: 150, height: 150 }}
              />
            ) : (
              ""
            )}
          </div>
          <h1 className="text-5xl">{weatherMain}</h1>
          <p className="mt-1">Feels Like {feelsLike}&deg; C</p>
        </div>
      </div>
    </div>
  );
};

export default MyWeather;
