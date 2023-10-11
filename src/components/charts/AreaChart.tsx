'use client';
import { useState } from 'react';
import Chart from 'react-apexcharts';

interface AreaChartProps {
  chartData: number[];
  title: string;
  xAxysType: 'category' | 'datetime' | 'numeric' | undefined;
}

const AreaChart = ({ chartData, title, xAxysType }: AreaChartProps) => {
  const [options] = useState<ApexCharts.ApexOptions>({
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: xAxysType,
      labels: {
        format: 'MMM',
      },
      tickAmount: 12, // Display all twelve months on the x-axis
    },
    yaxis: {
      title: {
        text: title,
      },
      labels: {
        formatter: (value) => Math.round(value).toString(), // Display y-axis labels as integers
      },
    },
    colors: ['#23a217'],
  });

  const [series] = useState<ApexAxisChartSeries>([
    {
      name: 'Actividades',
      data: chartData,
    },
  ]);

  return <Chart options={options} series={series} seriestype="bar" height={250} />;
};

export default AreaChart;
