
import { useEffect } from "react";

export const useConnect = () => {
    const [symbolData, setSymbolData] = useState({});
  
  useEffect(() => {
    const url = `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}&subs=${subscriptions}`;
    const socket = new WebSocket(url);

    // should be custom hook
    // symbols should be a list and when click show the realtime data and history of that 
    
    socket.onopen = function () {
      socket.send(
        JSON.stringify({
          "action": "SubAdd",
          "subs": ["5~CCCAGG~BTC~USD", "0~Coinbase~ETH~USD", "2~Binance~BTC~USDT"]
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

  return {symbolData}
} 