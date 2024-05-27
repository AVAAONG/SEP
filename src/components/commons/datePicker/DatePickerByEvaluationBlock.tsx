'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BLOCKS, MONTHS_FOR_BLOCKS, YEARS } from './constants';
import { linkClass } from './helpers';

const DatePickerByEvaluationBlock = () => {
  const [selected, setSelected] = useState<{
    year: string | null;
    quarter: string | null;
    month: string | null;
  }>({ year: null, quarter: null, month: null });
  const { get, set } = useSearchParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive tabs from selected state
  const yearTabs = YEARS.map((tab) => ({ ...tab, current: tab.href === selected.year }));
  const quarterTabs = BLOCKS.map((tab) => ({ ...tab, current: tab.href === selected.quarter }));
  const monthTabs = MONTHS_FOR_BLOCKS.filter((tab) => tab.quarter === selected.quarter).map(
    (tab) => ({
      ...tab,
      current: tab.href === selected.month,
    })
  );

  useEffect(() => {
    const newSelected = {
      year: get('year') || null,
      quarter: get('quarter') || null,
      month: get('month') || null,
    };
    setSelected(newSelected);
  }, [searchParams]);

  const handleTabClick = (level: 'year' | 'quarter' | 'month', value: string) => {
    const newSearchParams = new URLSearchParams(searchParams); // Start with existing params

    // Toggle selection on the same level
    if (newSearchParams.get(level) === value) {
      newSearchParams.delete(level);
    } else {
      newSearchParams.set(level, value);

      // Preserve params lexicographically before 'year'
      if (level === 'year') {
        for (const [key, val] of newSearchParams.entries()) {
          // Delete unless the key comes before 'year'
          if (key > 'year') {
            newSearchParams.delete(key);
          }
        }
      } else if (level === 'quarter') {
        newSearchParams.delete('month');
      }
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-col space-y-1 items-center">
      <nav className="flex space-x-2 rounded-md" aria-label="Tabs">
        {yearTabs.map((tab) => (
          <button
            key={tab.name}
            className={linkClass(tab.current)}
            aria-current={tab.current ? 'page' : undefined}
            onClick={() => handleTabClick('year', tab.href)}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      {selected.year && (
        <nav className="flex space-x-2 " aria-label="Tabs">
          {quarterTabs.map((tab) => (
            <button
              key={tab.name}
              className={linkClass(tab.current)}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => handleTabClick('quarter', tab.href)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      )}

      {selected.year && selected.quarter && (
        <nav className="flex space-x-2 " aria-label="Tabs">
          {monthTabs.map((tab) => (
            <button
              key={tab.name}
              className={linkClass(tab.current)}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => handleTabClick('month', tab.href)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default DatePickerByEvaluationBlock;
