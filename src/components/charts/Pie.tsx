'use client';
import Chart from 'react-apexcharts';
interface PieChartProps {
  data: { label: string; value: number }[];
}

const PieChart = ({ data }: PieChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: data.map((d) => d.label),
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ['#23a217', '#eab308', '#1d4ed8', '#b91c1c'],
  };

  const series = data.map((d) => d.value);

  return <Chart options={options} series={series} type="pie" />;
};

export default PieChart;
