'use client';
import Chart from 'react-apexcharts';
import Legend from './common/Legend';
import { COLORS } from './common/chartConstants';

interface ChartProps {
  data: Array<{ label: string; value: number, color?: string }>;
  chartTitle: string
}

const DonutChart: React.FC<ChartProps> = ({ data, chartTitle }) => {
  const options: ApexCharts.ApexOptions = {
    labels: data.map((d) => d.label),
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: data.some((d) => d.color) ? data.map((d) => d.color) : COLORS,
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
  return (
    <div className='w-full'>
      <div className='flex gap-3 items-center justify-center'>
        <h3 className="font-semibold text-center text-sm">
          {chartTitle}
        </h3>
        <Legend data={data} />
      </div>
      <Chart options={options} series={series} type="donut" />
    </div>
  );
};

export default DonutChart;