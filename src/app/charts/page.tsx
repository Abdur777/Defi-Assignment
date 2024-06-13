"use client"
// pages/index.tsx
import { useState } from 'react';
import CryptoList from '../../components/CryptoList';
import LineChart from '../../components/LineChart';
import Header from '@/components/Header';

const Home = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('bitcoin');
  const [days, setDays] = useState<number>(7);

  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
  };

  const handleCoinSelect = (id: string) => {
    setSelectedCoin(id);
  };

  return (
    <div>
    <Header/>
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Cryptocurrency Price Chart</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <CryptoList onSelect={handleCoinSelect} selectedCoin={selectedCoin} />
        </div>
        <div className="md:w-2/3">
          <div className="mb-4 flex space-x-2">
            <button
              onClick={() => handleDaysChange(1)}
              className={`p-2 rounded ${days === 1 ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'}`}
            >
              1 Day
            </button>
            <button
              onClick={() => handleDaysChange(7)}
              className={`p-2 rounded ${days === 7 ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'}`}
            >
              1 Week
            </button>
            <button
              onClick={() => handleDaysChange(30)}
              className={`p-2 rounded ${days === 30 ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'}`}
            >
              1 Month
            </button>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <LineChart id={selectedCoin} days={days} />
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
};

export default Home;
