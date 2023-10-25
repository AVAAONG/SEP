'use client';
import { useState } from 'react';
import Chart from 'react-apexcharts';

interface AreaBarChartProps {
  areaSeries;
  barSeries;
}

const MixedChart = ({ areaSeries, barSeries, }: AreaBarChartProps) => {
  const [options] = useState<ApexCharts.ApexOptions>({
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MMM',
      },
      tickAmount: 12, // Display all twelve months on the x-axis
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value).toString(), // Display y-axis labels as integers
      },
    },
    colors: ['#23a217'],
  });

  const [series] = useState<ApexAxisChartSeries>([
    areaSeries,
    barSeries,
  ]);

  return <Chart options={options} series={series} type="line" height={250} />;
};

export default MixedChart;
