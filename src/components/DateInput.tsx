import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
type Props = {
  register: UseFormRegister<any>;
};

const DateInput: React.FC<Props> = ({ register }) => {
  const [inputs, setInputs] = useState([{ id: 0, date: '', startHour: '', endHour: '' }]);

  const addInput = () => {
    const newId = inputs.length;
    setInputs([...inputs, { id: newId, date: '', startHour: '', endHour: '' }]);
  };

  const deleteInput = (id: number) => {
    const newInputs = inputs.filter((input) => input.id !== id);
    setInputs(newInputs);
  };

  return (
    <>
      {inputs.map((input, index) => {
        const { id, date, startHour, endHour } = input;
        const isLastInput = index === inputs.length - 1;
        return (
          <>
            < div className="col-span-2 md:col-span-1 relative" >
              <button
                type="button"
                onClick={isLastInput ? addInput : () => deleteInput(id)}
                className={`inline h-6 w-6 rounded-full text-base font-bold text-white absolute ${isLastInput ? 'bg-green-700 translate-x-64 translate-y-2' : 'bg-red-700 translate-x-56 translate-y-2'
                  }`}
              >
                {isLastInput ? '+' : '-'}
              </button>
              <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 uppercase ">
                Fecha {index + 1}
              </label>
              <input type="date" {...register(`date.${id}` as const)} defaultValue={date} />
            </div >
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 uppercase ">
                Hora de inicio {index + 1}
              </label>
              <input type="time" {...register(`startHour.${id}` as const)} defaultValue={startHour} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 uppercase ">
                Hora de cierre {index + 1}
              </label>
              <input type="time" {...register(`endHour.${id}` as const)} defaultValue={endHour} />
            </div>
          </>
        );
      })}
    </>
  );
};

export default DateInput;