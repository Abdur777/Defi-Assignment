// components/LineChart.tsx
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { getHistoricalData } from '../services/coingecko';
import 'chart.js/auto';

Chart.register(...registerables);

interface LineChartProps {
  id: string;
  days: number;
}

const LineChart: React.FC<LineChartProps> = ({ id, days }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoricalData(id, days);
        const prices = data.prices.map((price: number[]) => ({
          x: new Date(price[0]),
          y: price[1],
        }));
        setChartData({
          datasets: [
            {
              label: 'Price in USD',
              data: prices,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 0.6)',
              backgroundColor: 'rgba(75, 192, 192, 0.4)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data', error);
      }
    };

    fetchData();
  }, [id, days]);

  return (
    <div>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                grid: {
                  color: 'rgba(200, 200, 200, 0.3)', // Light gray grid lines
                },
                ticks: {
                  color: 'rgba(200, 200, 200, 0.8)', // Light gray ticks
                }
              },
              y: {
                grid: {
                  color: 'rgba(200, 200, 200, 0.3)', // Light gray grid lines
                },
                ticks: {
                  color: 'rgba(200, 200, 200, 0.8)', // Light gray ticks
                }
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LineChart;
