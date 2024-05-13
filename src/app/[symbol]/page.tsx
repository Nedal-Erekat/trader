// pages/details_[symbol].js

import React from "react";
import StockDetails from "../components/StockDetails";
import Link from "next/link";
import styles from "./page.module.css";
const DetailsPage = ({ params }: { params: { symbol: string } }) => {
  const symbol = params.symbol;

  return (
    <div>
      <button className={styles.link}>
        <Link href="/">Stokes List</Link>
      </button>
      <h1>Historical Stock Prices {decodeURIComponent(symbol)}</h1>
      <StockDetails symbol={symbol} />
    </div>
  );
};

export default DetailsPage;
