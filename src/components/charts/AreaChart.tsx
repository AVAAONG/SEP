'use client';
import Chart from 'react-apexcharts';

interface AreaChartProps {
  series: ApexAxisChartSeries;
  title: string;
  xAxysType: 'category' | 'datetime' | 'numeric' | undefined;
}

const AreaChart = ({ series, title, xAxysType }: AreaChartProps) => {
  const options: ApexCharts.ApexOptions = {
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
      }, // Display all twelve months on the x-axis
    },
    yaxis: {
      title: {
        text: title,
      },
      labels: {
        formatter: (value) => Math.round(value).toString(), // Display y-axis labels as integers
      },
    },
    colors: series.map((d) => d.color),
  };

  return <Chart options={options} series={series} seriestype="bar" height={250} />;
};

export default AreaChart;
