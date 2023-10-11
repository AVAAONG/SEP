'use client';
import Chart from 'react-apexcharts';
interface PieChartProps {
  data: { label: string; value: number }[];
}

const LineChart = ({ data }: PieChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
    },
    series: [
      {
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
      },
    ],
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    labels: data.map((d) => d.label),
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    // colors: ['#23a217', '#eab308', '#1d4ed8', '#b91c1c', '#062e05', '#d97706', '#0e3fa9'],
    tooltip: {
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          },
        },
      },
    },
    colors: ['#000000'],
  };

  const series = data.map((d) => d.value);

  return <Chart options={options} series={series} type="line" />;
};

export default LineChart;
