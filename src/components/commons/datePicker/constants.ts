import { getYearObjects } from './helpers';

const MONTHS = [
  { name: 'Enero', href: '0', quarter: '1', current: false },
  { name: 'Febrero', href: '1', quarter: '1', current: false },
  { name: 'Marzo', href: '2', quarter: '1', current: false },
  { name: 'Abril', href: '3', quarter: '2', current: false },
  { name: 'Mayo', href: '4', quarter: '2', current: false },
  { name: 'Junio', href: '5', quarter: '2', current: false },
  { name: 'Julio', href: '6', quarter: '3', current: false },
  { name: 'Agosto', href: '7', quarter: '3', current: false },
  { name: 'Septiembre', href: '8', quarter: '3', current: false },
  { name: 'Octubre', href: '9', quarter: '4', current: false },
  { name: 'Noviembre', href: '10', quarter: '4', current: false },
  { name: 'Diciembre', href: '11', quarter: '4', current: false },
];
const QUARTERS = [
  { name: '1er trimestre', href: '1', current: false },
  { name: '2do trimestre', href: '2', current: false },
  { name: '3er trimestre', href: '3', current: false },
  { name: '4to trimestre', href: '4', current: false },
];
const MONTHS_FOR_BLOCKS = [
  { name: 'Enero', href: '0', quarter: '1', current: false },
  { name: 'Febrero', href: '1', quarter: '1', current: false },
  { name: 'Marzo', href: '2', quarter: '1', current: false },
  { name: 'Abril', href: '3', quarter: '1', current: false },
  { name: 'Mayo', href: '4', quarter: '2', current: false },
  { name: 'Junio', href: '5', quarter: '2', current: false },
  { name: 'Julio', href: '6', quarter: '2', current: false },
  { name: 'Agosto', href: '7', quarter: '2', current: false },
  { name: 'Septiembre', href: '8', quarter: '3', current: false },
  { name: 'Octubre', href: '9', quarter: '3', current: false },
  { name: 'Noviembre', href: '10', quarter: '3', current: false },
  { name: 'Diciembre', href: '11', quarter: '3', current: false },
];

const BLOCKS = [
  { name: '1er periodo', href: '1', current: false },
  { name: '2do periodo', href: '2', current: false },
  { name: '3er periodo', href: '3', current: false },
];

const YEARS = getYearObjects();

export { BLOCKS, MONTHS, MONTHS_FOR_BLOCKS, QUARTERS, YEARS };

