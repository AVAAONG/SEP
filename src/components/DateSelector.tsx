'use client'
import { classNames } from '@/lib/scholar/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const getYearObjects = (): { name: string; queryYear: string; current: boolean }[] => {

  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2020; year <= currentYear; year++) {
    years.push({
      name: year.toString(),
      queryYear: year.toString(),
      current: false,
    });
  }

  return years;
}

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

const YEARS = getYearObjects();
/**
 * A React component that provides a user interface for selecting a date range.
 * The component updates the URL query parameters accordingly.
 * @abstract The component conditionally renders the quarter and month tabs based on whether a year and quarter have been selected.
 */
const DateSelector = () => {
  const [yearTabs, setYearTabs] = useState(YEARS);
  const [quarterTabs, setQuarterTabs] = useState(QUARTERS);
  const [monthTabs, setMonthTabs] = useState(MONTHS);
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const querys = useSearchParams()
  const year = querys.get('year')
  const quarter = querys.get('quarter')
  const month = querys.get('month')
  useEffect(() => {
    if (year) {
      setYearTabs((prevTabs) =>
        prevTabs.map((prevTab) => ({
          ...prevTab,
          current: prevTab.queryYear === year,
        }))
      );
    }
    if (quarter) {
      setQuarterTabs((prevTabs) =>
        prevTabs.map((prevTab) => ({
          ...prevTab,
          current: prevTab.href === quarter,
        }))
      );
    }
    if (month) {
      setMonthTabs((prevTabs) =>
        prevTabs.map((prevTab) => ({
          ...prevTab,
          current: prevTab.href === month,
        }))
      );
    }
    setSearchParams(new URLSearchParams(`year=${year}&quarter=${quarter}&month=${month}`));
  }, [year, quarter, month]);

  return (
    <div className="flex flex-col space-y-1 items-center ">
      <nav className="flex space-x-2  rounded-md" aria-label="Tabs">
        {yearTabs.map((tab) => (
          <Link
            replace={false}
            key={tab.name}
            href={tab.current ? '?' : `?year=${tab.queryYear}`}
            className={classNames(
              tab.current ? 'text-primary-light font-semibold' : 'text-gray-500 hover:text-gray-700',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={tab.current ? 'page' : undefined}
            onClick={() => {
              if (tab.current) {
                setYearTabs(YEARS);
                setQuarterTabs(QUARTERS);
                setMonthTabs(MONTHS);
                setSearchParams(new URLSearchParams());
              } else {
                setYearTabs((prevTabs) =>
                  prevTabs.map((prevTab) => ({
                    ...prevTab,
                    current: prevTab.queryYear === tab.queryYear,
                  }))
                );
                setSearchParams(new URLSearchParams(`year=${tab.queryYear}`));
              }
            }}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
      {
        year && (
          <nav className="flex space-x-2 " aria-label="Tabs">
            {quarterTabs.map((tab) => (
              <Link
                replace={false}
                key={tab.name}
                href={tab.current ? `?year=${searchParams.get('year')}` : `?year=${searchParams.get('year')}&quarter=${tab.href}`}
                className={classNames(
                  tab.current ? 'text-primary-light font-semibold' : 'text-gray-500 hover:text-gray-700',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
                onClick={() => {
                  if (tab.current) {
                    setQuarterTabs(QUARTERS);
                    setMonthTabs(MONTHS);
                    setSearchParams(new URLSearchParams(`year=${searchParams.get('year')}`));
                  } else {
                    setQuarterTabs((prevTabs) =>
                      prevTabs.map((prevTab) => ({
                        ...prevTab,
                        current: prevTab.href === tab.href,
                      }))
                    );
                    setSearchParams(new URLSearchParams(`year=${searchParams.get('year')}&quarter=${tab.href}`));
                  }
                }}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        )
      }
      {
        year && quarter && (

          <nav className="flex space-x-2 " aria-label="Tabs">
            {monthTabs.map((tab) => {
              if (tab.quarter === quarter) {
                return (<Link
                  key={tab.name}
                  replace={false}
                  href={tab.current ? `?year=${searchParams.get('year')}&quarter=${searchParams.get('quarter')}` : `?year=${searchParams.get('year')}&quarter=${searchParams.get('quarter')}&month=${tab.href}`}
                  className={classNames(
                    tab.current ? 'text-primary-light font-semibold' : 'text-gray-500 hover:text-gray-700',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                  onClick={() => {
                    if (tab.current) {
                      setQuarterTabs(QUARTERS);
                      setMonthTabs(MONTHS);
                      setSearchParams(new URLSearchParams(`year=${searchParams.get('year')}&quarter=${searchParams.get('quarter')}`));
                    } else {
                      setMonthTabs((prevTabs) =>
                        prevTabs.map((prevTab) => ({
                          ...prevTab,
                          current: prevTab.href === tab.href,
                        }))
                      );
                      setSearchParams(new URLSearchParams(`year=${searchParams.get('year')}&quarter=${searchParams.get('quarter')}&month=${tab.href}`));
                    }
                  }}
                >
                  {tab.name}
                </Link>)
              }
            })}
          </nav>
        )
      }
    </div >
  );
};

export default DateSelector;
