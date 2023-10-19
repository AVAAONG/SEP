'use client';
import Chart from 'react-apexcharts';
interface RadarChartProps {
  data: { label: string; value: number }[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map((d) => d.label),
    },
    markers: {
      size: 0,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ['#23a217', '#eab308', '#1d4ed8', '#b91c1c', '#062e05', '#d97706', '#0e3fa9'],
  };
  const series = data.map((s) => ({
    name: s.label,
    data: s.value,
  }));
  console.log(series);

  return (
    <div>
      <Chart options={options} series={series} type="radar" />
    </div>
  );
};

export default RadarChart;
