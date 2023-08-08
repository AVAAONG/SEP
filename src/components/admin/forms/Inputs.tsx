import { FieldValues, UseFormRegister } from 'react-hook-form';
type InputProps = {
  inputType: string;
  title: string;
  inputOptions?: string[];
  type: string;
  placeHolder: string;
  register: UseFormRegister<FieldValues>;
  inputId: string;
  requiredInput?: boolean;
  autoFocus?: boolean;
  minimum?: string;
};

const Input = ({
  inputType,
  title,
  inputOptions,
  type,
  placeHolder,
  register,
  inputId,
  requiredInput,
  autoFocus,
  minimum,
}: InputProps) => {
  const getDate = () => {
    let date = new Date().toISOString();
    let search = date.indexOf(':');
    date = date.slice(0, search - 3);
    return date;
  };

  //Returns an input that grabs the two columns in the grid.
  if (inputType === 'complete') {
    return (
      <div className="col-span-2 h-fit" key={inputId}>
        <label
          htmlFor={title.trim()}
          className="block mb-2 text-sm m-l-1 font-medium  text-slate-400"
        >
          {title}
        </label>
        <input
          defaultValue={placeHolder}
          {...register(inputId)}
          type={type}
          id={title.trim()}
          className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600"
          placeholder={placeHolder}
          required
        />
      </div>
    );
  } else if (inputType === 'textArea') {
    return (
      <div className="col-span-2 h-fit" key={inputId}>
        <label
          htmlFor={title.trim()}
          className="block mb-2 text-sm m-l-1 font-medium max-h-10 text-slate-400"
        >
          {title}
        </label>
        <textarea
          defaultValue={placeHolder}
          {...register(inputId)}
          id={title.trim()}
          className="min-h-[4rem] focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 "
          placeholder={placeHolder}
        />
      </div>
    );
  } else if (inputType === 'selection') {
    /**  * Return a selection input type. */
    if (inputOptions === undefined || inputOptions === null) {
      return (
        <div key={inputId}>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium  text-slate-400"
          >
            {title}
          </label>
          <input
            defaultValue={'Cargando facilitadores ...'}
            id="countries"
            className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600"
          />
        </div>
      );
    } else {
      return (
        <div key={inputId}>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium  text-slate-400"
          >
            {title}
          </label>
          <select
            defaultValue={placeHolder}
            {...register(inputId)}
            id="countries"
            className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 "
          >
            {inputOptions!.map((option) => {
              return <option key={option}>{option}</option>;
            })}
          </select>
        </div>
      );
    }
  } else if (inputType === 'allowedSelection') {
    return (
      <div key={inputId}>
        <label
          htmlFor={title.trim()}
          className="block mb-2 text-sm font-medium text-slate-400"
        >
          {title}
        </label>
        <input
          defaultValue={placeHolder}
          list="allowedSelection"
          {...register(inputId)}
          id={title.trim()}
          className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 "
        ></input>
        <datalist id="allowedSelection">
          {inputOptions!.map((option) => {
            return <option key={option}>{option}</option>;
          })}
        </datalist>
      </div>
    );
  } else if (inputType === 'date') {
    return (
      <div key={inputId}>
        <label
          htmlFor={title.trim()}
          className="block mb-2 text-sm m-l-1 font-medium  text-slate-400"
        >
          {title}
        </label>
        <input
          defaultValue={placeHolder}
          autoFocus={autoFocus}
          {...register(inputId)}
          type={type}
          id={title.trim()}
          className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 "
          placeholder={placeHolder}
          required={requiredInput}
          min={getDate()}
        />
      </div>
    );
  } else if (inputType === 'normal') {
  /**  * Return a normla input, the type varies*/
    return (
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium  text-slate-400"
        >
          {title}
        </label>
        <input
          defaultValue={placeHolder}
          {...register(inputId)}
          type={type}
          id="first_name"
          className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 "
          placeholder={placeHolder}
          required
        />
      </div>
    );
  } else if (inputType === 'checkbox') {
    return (
      <div className="col-span-2 h-fit flex flex-col" key={inputId}>
        <p className="block mb-2 text-sm font-medium  text-slate-400">
          {title}
        </p>
        <div className="flex">
          {inputOptions!.map((input) => {
            return (
              <div className="flex flex-row items-center mr-4" key={input}>
                <input
                  {...register(inputId)}
                  type="checkbox"
                  value={input}
                  id="year"
                  className="w-4 h-4 bg-emerald-900  accent-green-500 text-emerald-600 border-gray-300 focus:ring-0 "
                />
                <label htmlFor="year" className="ml-2 font-medium text-sm ">
                  {input}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Input;
