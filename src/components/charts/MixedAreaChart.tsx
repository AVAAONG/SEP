'use client';
import Chart from 'react-apexcharts';

interface AreaBarChartProps {
  areaSeries: ApexNonAxisChartSeries;
  barSeries: ApexNonAxisChartSeries;
}

const MixedChart = ({ areaSeries, barSeries }: AreaBarChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value).toString(), // Display y-axis labels as integers
      },
    },
    colors: ['#23a217'],
  };
  const series = [areaSeries, barSeries];
  return <Chart options={options} series={series} type="line" height={250} />;
};

export default MixedChart;
