'use client';
import Chart from 'react-apexcharts';
import { COLORS } from './common/chartConstants';

interface AreaBarChartProps {
  areaSeries: {
    data: {
      x: string;
      y: number;
    }[];
    name: string;
    color: string;
    type: string;
  };
  barSeries: {
    data: {
      x: string;
      y: number;
    }[];
    name: string;
    color: string;
    type: string;
  };
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
    colors: COLORS,
  };
  const series = [areaSeries, barSeries];
  return <Chart options={options} series={series} type="line" height={250} />;
};

export default MixedChart;
