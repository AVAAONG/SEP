'use client'
import { classNames } from '@/lib/scholar/utils';
import { getYearObjects } from '@/lib/utils2';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MONTHS = [
  { name: 'Enero', href: 'Enero', quarter: 'I', current: false },
  { name: 'Febrero', href: 'Febrero', quarter: 'I', current: false },
  { name: 'Marzo', href: 'Marzo', quarter: 'I', current: false },
  { name: 'Abril', href: 'Abril', quarter: 'II', current: false },
  { name: 'Mayo', href: 'Mayo', quarter: 'II', current: false },
  { name: 'Junio', href: 'Junio', quarter: 'II', current: false },
  { name: 'Julio', href: 'Julio', quarter: 'III', current: false },
  { name: 'Agosto', href: 'Agosto', quarter: 'III', current: false },
  { name: 'Septiembre', href: 'Septiembre', quarter: 'III', current: false },
  { name: 'Octubre', href: 'Octubre', quarter: 'IV', current: false },
  { name: 'Noviembre', href: 'Noviembre', quarter: 'IV', current: false },
  { name: 'Diciembre', href: 'Diciembre', quarter: 'IV', current: false },
];
const QUARTERS = [
  { name: '1er trimestre', href: 'I', current: false },
  { name: '2do trimestre', href: 'II', current: false },
  { name: '3er trimestre', href: 'III', current: false },
  { name: '4to trimestre', href: 'IV', current: false },
];

const YEARS = getYearObjects();

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
                  href={tab.current ? `?year=${searchParams.get('year')}&quarter=${tab.href}` : `?year=${searchParams.get('year')}&quarter=${searchParams.get('quarter')}&month=${tab.href}`}
                  className={classNames(
                    tab.current ? 'text-primary-light font-semibold' : 'text-gray-500 hover:text-gray-700',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                  onClick={() => {
                    if (tab.current) {
                      setQuarterTabs(QUARTERS);
                      setMonthTabs(MONTHS);
                      setSearchParams(new URLSearchParams(`year=${searchParams.get('year')}&quarter=${tab.href}`));
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
