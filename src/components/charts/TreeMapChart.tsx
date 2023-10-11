'use client';
import Chart from 'react-apexcharts';

interface TreeMapChartProps {
  data: Array<{ label: string; value: number }>;
}

const TreeMapChart = ({ data }: TreeMapChartProps) => {
  const options: ApexCharts.ApexOptions = {
    legend: {
      show: false,
    },
    chart: {
      type: 'treemap',
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    colors: ['#23a217', '#eab308', '#1d4ed8', '#b91c1c'],
  };

  const series: ApexCharts.ApexOptions['series'] = [
    {
      data: data.map(({ label, value }) => ({ x: label, y: value })),
    },
  ];

  return <Chart options={options} series={series} type="treemap" />;
};

export default TreeMapChart;
