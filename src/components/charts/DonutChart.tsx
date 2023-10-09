'use client';
import Chart from 'react-apexcharts';

interface ChartProps {
  data: Array<{ label: string; value: number }>;
}

const DonutChart: React.FC<ChartProps> = ({ data }) => {
  const options: ApexCharts.ApexOptions = {
    labels: data.map((d) => d.label),
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ['#23a217', '#eab308', '#1d4ed8', '#b91c1c'],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
          },
        },
      },
    },
  };

  const series = data.map((d) => d.value);

  return <Chart options={options} series={series} type="donut" />;
};

export default DonutChart;
