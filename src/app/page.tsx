"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StockValue from "./components/stockItem/stock";
import Link from "next/link";

export default function Home() {
  const [symbolData, setSymbolData] = useState({});
  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.twelvedata.com/v1/quotes/price?apikey=dd1187a4708c4f8595b8dfcbaf773441`
    );

    socket.onopen = function () {
      socket.send(
        JSON.stringify({
          action: "subscribe",

          params: {
            symbols: "AAPL,INFY,TRP,QQQ,IXIC,EUR/USD,USD/JPY,BTC/USD,ETH/BTC",
          },
        })
      );
    };

    // Listen for messages
    socket.addEventListener("message", (event) => {
      // console.log("Message from server ", event.data);
      const data = JSON.parse(event.data);
      // Update symbol data
      setSymbolData((prevData) => {
        if (data.symbol) {
          return {
            ...prevData,
            [data.symbol]: data.price,
          };
        }

        return { ...prevData };
      });
    });

    return () => socket.close();
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to Stock Value App</h1>
        {Object.entries(symbolData).map(([symbol, price]) => (
          <Link key={symbol} href={`/${encodeURIComponent(symbol)}`}>
            <StockValue symbol={symbol} stockValue={price} />
          </Link>
        ))}
      </div>
    </main>
  );
}
