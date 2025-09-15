import React, { useState } from "react";
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
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { formatUnixToHour } from "../shared/formatUnixToHr";
import { setFilterByDate } from "../../features/weather/weatherSlice";
const WeekWeather = () => {
  const dispatch = useDispatch();
  const {
    sunrise,
    sunset,
    filterWeather,
    tomorrowWeatherMain,
    tomorrowTemp,
    tomorrowWeatherDescription,
    date,
  } = useSelector((state) => state?.weather);

  const [weatherDate, setWeatherDate] = useState(null);
  // Generate today + next 5 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      const dateOnly = d.toISOString().split("T")[0]; // YYYY-MM-DD

      dates.push({
        value: dateOnly, // just the date
        label: d.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      });
    }
    return dates;
  };

  const handleChange = (e) => {
    dispatch(setFilterByDate(e.target.value));
    setWeatherDate(e.target.value);
  };

  return (
    <div className="bg-[#0E1421] p-10 rounded-2xl shadow-2xl h-full">
      {/* main */}
      <div className="flex justify-between gap-6">
        {/* left */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold mb-2">Today / Week</h1>{" "}
            {/* select date */}
            <div>
              <select
                onChange={handleChange}
                value={weatherDate} // ✅ bind to selected date from Redux
                className="p-2 rounded-md bg-[#0E1421] text-white"
              >
                {generateDates().map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 bg-[#14203A] p-4 rounded-2xl">
            {/* cards */}
            {filterWeather?.map((item) => (
              <>
                <div className="bg-[#1E2637] w-fit p-2 rounded-2xl shadow-2xl">
                  <h1>{formatUnixToHour(item?.dt)}</h1>

                  {item?.weather[0]?.main === "Thunderstorm" ? (
                    <Lottie
                      animationData={thunderstormIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Drizzle" ? (
                    <Lottie
                      animationData={drizzleIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Rain" ? (
                    <Lottie
                      animationData={rainIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Snow" ? (
                    <Lottie
                      animationData={snowIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Clear" ? (
                    <Lottie
                      animationData={clearIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Clouds" ? (
                    <Lottie
                      animationData={cloudsIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Mist" ? (
                    <Lottie
                      animationData={mistIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Smoke" ? (
                    <Lottie
                      animationData={smokeIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Haze" ? (
                    <Lottie
                      animationData={hazeIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Dust" ? (
                    <Lottie
                      animationData={dustIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Fog" ? (
                    <Lottie
                      animationData={fogIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Sand" ? (
                    <Lottie
                      animationData={sandIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Ash" ? (
                    <Lottie
                      animationData={ashIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Squall" ? (
                    <Lottie
                      animationData={squallIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : item?.weather[0]?.main === "Tornado" ? (
                    <Lottie
                      animationData={tornadoIcon}
                      loop={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    ""
                  )}

                  <h1>{item?.main?.temp}&deg;</h1>
                </div>
              </>
            ))}
          </div>

          <div className="flex justify-between mt-4 bg-[#1E2637] px-6 py-2 rounded-full shadow-2xl">
            <div className="flex items-center lg:gap-6">
              <div>
                <h1 className="text-2xl">Tomorrow</h1>
                <p className="text-slate-500">{tomorrowWeatherDescription}</p>
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{tomorrowTemp}&deg;</h1>
              </div>
            </div>
            <div>
              {tomorrowWeatherMain === "Thunderstorm" ? (
                <Lottie
                  animationData={thunderstormIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Drizzle" ? (
                <Lottie
                  animationData={drizzleIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Rain" ? (
                <Lottie
                  animationData={rainIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Snow" ? (
                <Lottie
                  animationData={snowIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Clear" ? (
                <Lottie
                  animationData={clearIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Clouds" ? (
                <Lottie
                  animationData={cloudsIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Mist" ? (
                <Lottie
                  animationData={mistIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Smoke" ? (
                <Lottie
                  animationData={smokeIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Haze" ? (
                <Lottie
                  animationData={hazeIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Dust" ? (
                <Lottie
                  animationData={dustIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Fog" ? (
                <Lottie
                  animationData={fogIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Sand" ? (
                <Lottie
                  animationData={sandIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Ash" ? (
                <Lottie
                  animationData={ashIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Squall" ? (
                <Lottie
                  animationData={squallIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : tomorrowWeatherMain === "Tornado" ? (
                <Lottie
                  animationData={tornadoIcon}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="bg-[#14203A] p-4 rounded-2xl flex flex-col items-center  gap-12">
          <div>
            <h1 className="text-slate-500 text-3xl">Sunrise</h1>
            <p className="text-xl font-semibold">{sunrise}</p>
          </div>
          <div>
            <h1 className="text-slate-500 text-3xl">Sunset</h1>
            <p className="text-xl font-semibold">{sunset}</p>
          </div>
        </div>
      </div>
      {/* main */}
    </div>
  );
};

export default WeekWeather;
