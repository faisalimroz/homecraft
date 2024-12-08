import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define the types for the props and chart data
interface CategoryData {
  name: string;
  totalServices: number;
}

interface PieChartProps {
  categoryData: CategoryData[];
}

const PieChart: React.FC<PieChartProps> = ({ categoryData }) => {
  const [chartData, setChartData]:any = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#9333ea'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: categoryData.map((item) => item.name),
      datasets: [
        {
          data: categoryData.map((item) => item.totalServices),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#9333ea'],
        },
      ],
    });
  }, [categoryData]);

  return (
    <div className="w-full h-96 p-6 rounded-lg ">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              font: {
                size: 18,
                weight: 'bold',
              },
            },
            legend: {
              position: 'right',
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
