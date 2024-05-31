// hooks/useWebSocket.js
import { useEffect, useState, useRef } from 'react';

const useWebSocket = (apiKey, symbols) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const subscriptions = symbols.map(symbol => `5~CCCAGG~${symbol}~USD`).join(',');
    console.log('sub coin', subscriptions);
    
    useEffect(() => {
        const url = `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`;
        const websocket = new WebSocket(url);
        websocket.onopen = function () {
            websocket.send(
              JSON.stringify({
                "action": "SubAdd",
                "subs": subscriptions
            })
            );
          };

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { FROMSYMBOL, PRICE } = message;
            console.log(event,'>>');
            setData(prevData => ({
                ...prevData,
                [FROMSYMBOL]: PRICE,
            }));
        };

        websocket.onerror = (event) => {
            setError(event);
        };

        return () => {
            websocket.close();
        };
    }, [apiKey, subscriptions]);
    

    return { data, error };
};

export default useWebSocket;
