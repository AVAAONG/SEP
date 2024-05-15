import dynamic from 'next/dynamic';
/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 * @see https://stackoverflow.com/questions/67784672/react-next-js-doesnt-seem-to-work-with-apexcharts for more info
 */
const PieChartComponent = dynamic(() => import('./Pie'), { ssr: false });
const MixedAreaChartComponent = dynamic(() => import('./MixedAreaChart'), {
  ssr: false,
});
const DonutChartComponent = dynamic(() => import('./DonutChart'), { ssr: false });
const AreaChartComponent = dynamic(() => import('./AreaChart'), { ssr: false });

export { AreaChartComponent, DonutChartComponent, MixedAreaChartComponent, PieChartComponent };
