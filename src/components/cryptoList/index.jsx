// components/CryptoList.js
import Link from 'next/link';

const CryptoList = ({ cryptos }) => {
    return (
        <div>
            <h1>Cryptocurrencies</h1>
            <ul>
                {cryptos.map((crypto) => (
                    <li key={crypto.CoinInfo.Id}>
                        <Link href={`/${crypto.CoinInfo.Name}`}>
                            {crypto.CoinInfo.FullName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;
