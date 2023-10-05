'use client';
import Chart from 'react-apexcharts';

interface PieChartProps {
  data: { name: string; value: number }[];
}

const TreeMapChart = ({ data }: PieChartProps) => {
  var options = {
    legend: {
      show: false,
    },
    title: {
      text: 'Distibuted Treemap (different color for each cell)',
      align: 'center',
    },
    colors: [
      '#3B93A5',
      '#F7B844',
      '#ADD8C7',
      '#EC3C65',
      '#CDD7B6',
      '#C1F666',
      '#D43F97',
      '#1E5D8C',
      '#421243',
      '#7F94B0',
      '#EF6537',
      '#C0ADDB',
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };

  return <Chart options={options} series={data} type="treemap" width={200} />;
};

export default TreeMapChart;
