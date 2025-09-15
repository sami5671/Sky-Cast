import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const WindVisibility = () => {
  const { windVisibility } = useSelector((state) => state?.weather);

  if (!windVisibility) return null;

  const labels = Object.keys(windVisibility);

  // Bubble dataset: x=index, y=visibility (in km), r=bubble size
  const bubbleData = labels.map((day, index) => {
    const visibilityKm = windVisibility[day].visibility / 1000; // convert m → km
    return {
      x: index,
      y: visibilityKm,
      r: Math.max(8, Math.min(20, visibilityKm / 2)), // normalize bubble size
    };
  });

  // Line dataset: wind speed (in km/h)
  const lineData = labels.map(
    (day) => windVisibility[day].wind * 3.6 // convert m/s → km/h
  );

  const chartData = {
    labels,
    datasets: [
      {
        type: "bubble",
        label: "Visibility (km)",
        data: bubbleData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
      {
        type: "line",
        label: "Wind Speed (km/h)",
        data: lineData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Wind & Visibility Forecast" },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.dataset.type === "bubble") {
              return `Visibility: ${context.raw.y} km`;
            }
            if (context.dataset.type === "line") {
              return `Wind: ${context.raw.toFixed(1)} km/h`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { callback: (val, i) => labels[i] },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Visibility (km)" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Wind Speed (km/h)" },
      },
    },
  };

  return (
    <div className="bg-[#0E1421] p-2 rounded-2xl">
      <Chart type="line" data={chartData} options={options} />
    </div>
  );
};

export default WindVisibility;
