// components/StockDetails.js
"use client";

import React, { useEffect, useState } from "react";
import styles from "./details.module.css";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";

const StockDetails = ({ symbol }) => {
  const [details, setDetails] = useState(null);
  const [labels, setLabels] = useState([]);
  const [prices, setPrices] = useState([]);

  // Chart options
  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
      },
      y: {
        title: {
          display: true,
          text: "Closing Price",
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=dd1187a4708c4f8595b8dfcbaf773441`
        );
        const data = await response.json();
        const labs = data.values.map((entry) => entry.datetime);
        const prs = data.values.map((entry) => parseFloat(entry.close));

        setLabels(labs);
        setPrices(prs);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup
    };
  }, [symbol]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Closing Price",
        data: prices,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      {details ? (
        <div className={styles.chart}>
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockDetails;
