'use client';
import React from 'react';
import Chart from 'react-apexcharts';

interface RadarChartProps {
  dataSeries: Array<Array<number>>;
}

const RadarChart: React.FC<RadarChartProps> = ({ dataSeries }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'radar',
    },
    series: dataSeries.map((series, index) => ({
      name: index.toString(),
      data: series,
    })),
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="radar" />
    </div>
  );
};

export default RadarChart;
