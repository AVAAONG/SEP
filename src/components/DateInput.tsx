import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<any>;
};

const ActivityForm: React.FC<Props> = ({ register }) => {
  const [count, setCount] = useState(1);

  const addInput = () => {
    setCount(count + 1);
  };

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <>
          <div key={i} className="col-span-2 md:col-span-1">
            <button
              type="button"
              onClick={addInput}
              className="inline h-6 w-6 bg-green-700 rounded-full text-base font-bold text-white absolute translate-x-64 translate-y-2"
            >
              +
            </button>
            <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 uppercase ">
              Fecha
            </label>
            <input type="date" {...register(`date.${i}`)} />
          </div>
          <div key={i} className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 uppercase ">
              Hora de inicio
            </label>
            <input type="time" {...register(`startHour.${i}`)} />
          </div>
          <div key={i} className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 uppercase ">
              Hora de cierre
            </label>
            <input type="time" {...register(`endHour.${i}`)} />
          </div>
        </>
      ))}
    </>
  );
};

export default ActivityForm;
