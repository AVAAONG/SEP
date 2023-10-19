'use client';
import { useState } from 'react';
import Chart from 'react-apexcharts';

interface AreaBarChartProps {
  areaSeries: number[];
  barSeries: number[];
  xAxysType: 'category' | 'datetime' | 'numeric' | undefined;
}

const MixedChart = ({ areaSeries, barSeries, xAxysType }: AreaBarChartProps) => {
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
      type: xAxysType,
      labels: {
        format: 'MMM',
      },
      tickAmount: 12, // Display all twelve months on the x-axis
    },
    yaxis: {
      //   labels: {
      //     formatter: (value) => Math.round(value).toString(), // Display y-axis labels as integers
      //   },
    },
    colors: ['#23a217'],
  });

  const [series] = useState<ApexAxisChartSeries>([
    {
      name: 'Area Series',
      type: 'area',
      data: areaSeries,
    },
    {
      name: 'Bar Series',
      type: 'bar',
      data: barSeries,
    },
  ]);

  return <Chart options={options} series={series} type="line" height={250} />;
};

export default MixedChart;
