// components/CryptoList.tsx
import { useEffect, useState } from 'react';
import { getCryptocurrencies } from '../services/coingecko';

interface CryptoListProps {
  onSelect: (id: string) => void;
  selectedCoin: string;
}

const CryptoList: React.FC<CryptoListProps> = ({ onSelect, selectedCoin }) => {
  const [cryptocurrencies, setCryptocurrencies] = useState<any[]>([]);

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const data = await getCryptocurrencies();
        setCryptocurrencies(data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies', error);
      }
    };

    fetchCryptocurrencies();
  }, []);

  return (
    <div className="mt-20 mr-10 p-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Cryptocurrencies</h2>
      <ul className="space-y-2">
        {cryptocurrencies.map((crypto) => (
          <li
            key={crypto.id}
            onClick={() => onSelect(crypto.id)}
            className={`cursor-pointer flex items-center p-2 rounded hover:bg-gray-200 transition ${
              selectedCoin === crypto.id ? 'bg-gray-300' : ''
            }`}
          >
            <img src={crypto.image} className="w-6 h-6 mr-2" alt={crypto.name} />
            {crypto.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
