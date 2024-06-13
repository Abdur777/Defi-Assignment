// services/coingecko.ts
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_TWO;

const getHistoricalData = async (id: string, days: number) => {
  const options = {
    method: 'GET',
    url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
    params: { vs_currency: 'usd', days: days },
    headers: { accept: 'application/json', 'x-cg-demo-api-key': API_KEY },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data from CoinGecko');
  }
};

const getCryptocurrencies = async () => {
  const options = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/coins/markets',
    params: { vs_currency: 'usd' },
    headers: { accept: 'application/json', 'x-cg-demo-api-key': API_KEY },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data from CoinGecko');
  }
};

export { getHistoricalData, getCryptocurrencies };
