'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MONTHS, QUARTERS, YEARS } from './constants';
import { linkClass } from './helpers';

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
  const querys = useSearchParams();
  const year = querys.get('year');
  const quarter = querys.get('quarter');
  const month = querys.get('month');
  useEffect(() => {
    if (year) {
      setYearTabs((prevTabs) =>
        prevTabs.map((prevTab) => ({
          ...prevTab,
          current: prevTab.href === year,
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
    <div className="flex flex-col space-y-1 items-center">
      <nav className="flex space-x-2  rounded-md" aria-label="Tabs">
        {yearTabs.map((tab) => (
          <Link
            replace={false}
            key={tab.name}
            href={tab.current ? '?' : `?year=${tab.href}`}
            className={linkClass(tab.current)}
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
                    current: prevTab.href === tab.href,
                  }))
                );
                setSearchParams(new URLSearchParams(`year=${tab.href}`));
              }
            }}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
      {year && (
        <nav className="flex space-x-2 " aria-label="Tabs">
          {quarterTabs.map((tab) => (
            <Link
              replace={false}
              key={tab.name}
              href={
                tab.current
                  ? `?year=${searchParams.get('year')}`
                  : `?year=${searchParams.get('year')}&quarter=${tab.href}`
              }
              className={linkClass(tab.current)}
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
                  setSearchParams(
                    new URLSearchParams(`year=${searchParams.get('year')}&quarter=${tab.href}`)
                  );
                }
              }}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      )}
      {year && quarter && (
        <nav className="flex space-x-2 " aria-label="Tabs">
          {monthTabs.map((tab) => {
            if (tab.quarter === quarter) {
              return (
                <Link
                  key={tab.name}
                  replace={false}
                  href={
                    tab.current
                      ? `?year=${searchParams.get('year')}&quarter=${searchParams.get('quarter')}`
                      : `?year=${searchParams.get('year')}&quarter=${searchParams.get(
                          'quarter'
                        )}&month=${tab.href}`
                  }
                  className={linkClass(tab.current)}
                  aria-current={tab.current ? 'page' : undefined}
                  onClick={() => {
                    if (tab.current) {
                      setQuarterTabs(QUARTERS);
                      setMonthTabs(MONTHS);
                      setSearchParams(
                        new URLSearchParams(
                          `year=${searchParams.get('year')}&quarter=${searchParams.get('quarter')}`
                        )
                      );
                    } else {
                      setMonthTabs((prevTabs) =>
                        prevTabs.map((prevTab) => ({
                          ...prevTab,
                          current: prevTab.href === tab.href,
                        }))
                      );
                      setSearchParams(
                        new URLSearchParams(
                          `year=${searchParams.get('year')}&quarter=${searchParams.get(
                            'quarter'
                          )}&month=${tab.href}`
                        )
                      );
                    }
                  }}
                >
                  {tab.name}
                </Link>
              );
            }
          })}
        </nav>
      )}
    </div>
  );
};

export default DateSelector;
