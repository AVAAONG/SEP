'use client';
import useMobile from '@/hooks/use-mobile';
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type DateRange = {
  startDate: string | null;
  endDate: string | null;
};

type Preset = {
  label: string;
  getValue: () => DateRange;
};

const DatePickerByEvaluationPeriod = () => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customRange, setCustomRange] = useState<DateRange>({ startDate: null, endDate: null });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isMobile } = useMobile();

  const currentYear = new Date().getFullYear();

  // Define quick presets for better UX
  const presets: Preset[] = [
    {
      label: 'Mes actual',
      getValue: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        return {
          startDate: new Date(year, month, 1).toISOString().split('T')[0],
          endDate: new Date(year, month + 1, 0).toISOString().split('T')[0],
        };
      },
    },
    {
      label: 'Últimos 3 meses',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 3);
        return {
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
        };
      },
    },
    {
      label: 'Período pasado',
      getValue: () => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        // Periods: 1 (Jan-Jun), 2 (Jul-Dec)
        const startMonth = 0;
        const endMonth = startMonth + 6; // used as next month in Date(year, monthIndex, 0)
        return {
          startDate: new Date(year, startMonth, 1).toISOString().split('T')[0],
          endDate: new Date(year, endMonth, 0).toISOString().split('T')[0],
        };
      },
    },
    {
      label: 'Período actual',
      getValue: () => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        // Periods: 1 (Jan-Jun), 2 (Jul-Dec)
        const periodIndex = Math.floor(month / 6);
        const startMonth = periodIndex * 6;
        const endMonth = startMonth + 6; // used as next month in Date(year, monthIndex, 0)
        return {
          startDate: new Date(year, startMonth, 1).toISOString().split('T')[0],
          endDate: new Date(year, endMonth, 0).toISOString().split('T')[0],
        };
      },
    },

    {
      label: 'Año actual',
      getValue: () => ({
        startDate: `${currentYear}-01-01`,
        endDate: `${currentYear}-12-31`,
      }),
    },
    {
      label: 'Año pasado',
      getValue: () => ({
        startDate: `${currentYear - 1}-01-01`,
        endDate: `${currentYear - 1}-12-31`,
      }),
    },
  ];

  // Initialize from URL params
  useEffect(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const preset = searchParams.get('preset');

    if (startDate && endDate) {
      setCustomRange({ startDate, endDate });
      setSelectedPreset(preset);
    }
  }, [searchParams]);

  const updateURL = (range: DateRange, presetLabel?: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Remove old date-related params

    newSearchParams.delete('startDate');
    newSearchParams.delete('endDate');
    newSearchParams.delete('preset');

    if (range.startDate && range.endDate) {
      newSearchParams.set('startDate', range.startDate);
      newSearchParams.set('endDate', range.endDate);
      if (presetLabel) {
        newSearchParams.set('preset', presetLabel);
      }
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePresetClick = (preset: Preset) => {
    const range = preset.getValue();
    setCustomRange(range);
    setSelectedPreset(preset.label);
    updateURL(range, preset.label);
  };

  const handleCustomDateChange = (field: 'startDate' | 'endDate', value: string) => {
    const newRange = { ...customRange, [field]: value };
    setCustomRange(newRange);
    setSelectedPreset(null);

    // Only update URL if both dates are set
    if (newRange.startDate && newRange.endDate) {
      updateURL(newRange);
    }
  };

  const clearSelection = () => {
    setCustomRange({ startDate: null, endDate: null });
    setSelectedPreset(null);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('startDate');
    newSearchParams.delete('endDate');
    newSearchParams.delete('preset');
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const getDisplayText = () => {
    if (selectedPreset) return selectedPreset;
    if (customRange.startDate && customRange.endDate) {
      const start = new Date(customRange.startDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const end = new Date(customRange.endDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      return `${start} - ${end}`;
    }
    return 'Seleccionar período';
  };

  const hasSelection = customRange.startDate || customRange.endDate || selectedPreset;

  return (
    <Popover placement="bottom" >
      <PopoverTrigger>
        <Button
          variant="bordered"
          startContent={<CalendarDaysIcon className="w-4 h-4" />}
          isIconOnly={isMobile}
          endContent={
            hasSelection ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
                className="ml-1 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            ) : null
          }
          className="text-sm font-medium"
        >
          <span className="hidden md:inline"> {getDisplayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-4" >
        <div className="space-y-4">
          {/* Presets Section */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Períodos predefinidos</h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}

                  variant={selectedPreset === preset.label ? 'solid' : 'flat'}
                  color={selectedPreset === preset.label ? 'success' : 'default'}
                  onClick={() => handlePresetClick(preset)}
                  className="justify-start"
                >
                  {preset.label}
                </Button>
              ))}
              <Button
                key="show-all"
                variant={selectedPreset === 'Mostrar todo' ? 'solid' : 'flat'}
                color={selectedPreset === 'Mostrar todo' ? 'success' : 'default'}
                onClick={() => {
                  // Show all items (no date filtering)
                  const newSearchParams = new URLSearchParams(searchParams.toString());
                  newSearchParams.delete('startDate');
                  newSearchParams.delete('endDate');
                  newSearchParams.set('preset', 'all');
                  router.replace(`${pathname}?${newSearchParams.toString()}`);
                  setSelectedPreset('Mostrar todo');
                }}
                className="justify-start col-span-2"
              >
                Mostrar todo
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-divider"></div>

          {/* Custom Range Section */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Rango personalizado</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  value={customRange.startDate || ''}
                  onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
                  max={customRange.endDate || undefined}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  value={customRange.endDate || ''}
                  onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
                  min={customRange.startDate || undefined}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-divider">
            <Button

              variant="flat"
              onClick={clearSelection}
              className="flex-1"
            >
              Limpiar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerByEvaluationPeriod;
