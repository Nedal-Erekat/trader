
import styles from "./page.module.css";
// import { useState } from "react";

import CryptoList from "../components/cryptoList";
import "chart.js/auto";

export default async function Home() {
  // const [symbolData, setSymbolData] = useState({});
  
  const res = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=YOUR_API_KEY');
    const data = await res.json();
    const cryptos = data.Data;

  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to Stock Value App</h1>
        <CryptoList cryptos={cryptos} />
      </div>
    </main>
  );
}
