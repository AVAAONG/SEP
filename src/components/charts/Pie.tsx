"use client";
import Chart from 'react-apexcharts';
interface PieChartProps {
    data: { name: string; value: number }[];
}

const PieChart = ({ data }: PieChartProps) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'pie',
        },
        labels: data.map((d) => d.name),
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#23a217', '#eab308', '#1d4ed8', "#b91c1c"],

    };

    const series = data.map((d) => d.value);

    return <Chart options={options} series={series} type="pie" width={200} />;
};

export default PieChart;
