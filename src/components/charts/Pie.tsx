'use client';
import Chart from 'react-apexcharts';
interface PieChartProps {
  data: { label: string; value: number; color?: string }[];
}

const COLORS = ['#23a217', '#eab308', '#1d4ed8', '#b91c1c', '#062e05', '#d97706', '#0e3fa9'];

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
    colors: data.some((d) => d.color) ? data.map((d) => d.color) : COLORS,
  };

  const series = data.map((d) => d.value);

  return <Chart options={options} series={series} type="pie" />;
};

export default PieChart;
