import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureGraph = () => {
  const { temperatureWeekly } = useSelector((state) => state?.weather);
  // ✅ Weekly data

  const labels = Object.keys(temperatureWeekly); // ["Saturday", "Sunday", ...]
  const temps = labels.map((day) => temperatureWeekly[day].temp);
  const humidities = labels.map((day) => temperatureWeekly[day].humidity);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3, // smooth curve
      },
      {
        label: "Humidity (%)",
        data: humidities,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Weather Forecast",
      },
    },
  };

  return (
    <div className="bg-[#0E1421] p-2 rounded-2xl">
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureGraph;
