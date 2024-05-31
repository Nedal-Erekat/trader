'use client'
import React, { useEffect, useState } from 'react';
import useWebSocket from '../../services/useWebSocket';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { API_KEY } from '../../services/coins';

const CryptoDetails = ({ symbol }) => {
    const { data: realTimeData } = useWebSocket(API_KEY, [symbol]);
    const [historicalData, setHistoricalData] = useState([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=30&api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => setHistoricalData(data.Data.Data));

        if (realTimeData[symbol]) {
            setPrice(realTimeData[symbol]);
        }
        
    }, [symbol, realTimeData]);

    const chartData = {
        labels: historicalData.map((entry) => new Date(entry.time * 1000).toLocaleDateString()),
        datasets: [
            {
                label: 'Price',
                data: historicalData.map((entry) => entry.close),
                fill: false,
                borderColor: 'blue',
            },
        ],
    };

    return (
        <div>
            <h1>Crypto Details: {symbol}</h1>
            <p>Real-time Price: ${price}</p>
            <Line data={chartData} />
        </div>
    );
};

export default CryptoDetails;
