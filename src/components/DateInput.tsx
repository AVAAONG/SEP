import { useState } from 'react';

interface DateInputProps {
  start: Date;
  end: Date;
  startHour: string;
  endHour: string;
  onAddDateInput: () => void;
}

const DateInput = ({ start, end, startHour, endHour, onAddDateInput }: DateInputProps) => {
  const [dates, setDates] = useState([
    {
      start,
      end,
      startHour,
      endHour,
    },
  ]);

  const handleAddDateInput = () => {
    setDates([...dates, { start: new Date(), end: new Date(), startHour: '', endHour: '' }]);
  };

  return (
    <div>
      {dates.map((date, index) => (
        <div key={index}>
          <input
            type="date"
            placeholder="Start Date"
            value={date.start}
            onChange={(e) =>
              setDates(dates.map((d, i) => (i === index ? { ...d, start: e.target.value } : d)))
            }
          />
          <input type="time" placeholder="Start Hour" value={date.startHour} />
          <input type="time" placeholder="End Hour" value={date.endHour} />
          <button
            className="w-4 h-4 mr-2 text-gray-500 hover:text-gray-700"
            onClick={handleAddDateInput}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default DateInput;
