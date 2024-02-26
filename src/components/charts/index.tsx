import dynamic from 'next/dynamic';

const PieChartComponent = dynamic(() => import('./Pie'), { ssr: false });

export { PieChartComponent };
