import React from "react";
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

import cloud from "../../assets/Images/cloud.png";
import { FaLocationDot } from "react-icons/fa6";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
const MyWeather = () => {
  const { temp, low, high, date, day, country, weatherMain, feelsLike } =
    useSelector((state) => state?.weather);
  return (
    <div className="bg-[#0E1421] p-12 rounded-2xl shadow-2xl h-full">
      <div className="flex flex-col lg:flex-row items-center justify-between ">
        {/* part 1 */}
        <div>
          <h1 className="bg-purple-600 w-fit p-2 rounded-full flex items-center gap-1 font-bold">
            <FaLocationDot />
            {country}
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
