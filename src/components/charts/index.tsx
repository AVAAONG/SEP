import dynamic from 'next/dynamic';
/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 */
const PieChartComponent = dynamic(() => import('./Pie'), { ssr: false });

export { PieChartComponent };
