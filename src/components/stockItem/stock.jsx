import React, { useEffect, useState } from "react";
import styles from "./stock.module.css"; // Import CSS module

const StockValue = ({ symbol, stockValue }) => {

  const [prevStockValue, setPrevStockValue] = useState(null);
  const [isUp, setIsUp] = useState(null);

  useEffect(() => {
    if (prevStockValue !== null) {
      const up = stockValue > prevStockValue;
      setIsUp(up);
    }
    setPrevStockValue(stockValue);
  }, [stockValue]);


  return (
    <div className={`${styles.container} ${isUp} ${isUp ? styles.green : styles.red}`}>
      <h1 className={styles.heading}>{symbol} Value:</h1>
      <p className={styles.value}>
        The current value of the stock is: {stockValue}
      </p>
    </div>
  );
};

export default StockValue;
