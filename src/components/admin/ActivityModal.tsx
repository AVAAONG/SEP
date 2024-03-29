import { CheckIcon } from '../../../public/svgs/svgs';

const ActivityModal = () => {
  return (
    <div
      tabIndex={-1}
      className={`${
        modalopen ? 'flex' : 'hidden'
      }  items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 rounded-lg shadow bg-slate-800 md:p-8">
          {loading === 'not' ? (
            <div className="text-sm font-light text-gray-400">
              <h3 className="mb-3 text-2xl font-bold  text-white">
                Coloca el Asusto y selecciona los contactos
              </h3>
              <form
                onSubmit={handleSubmit(async (data, event) => await sendWorkshops(data, event!))}
              >
                <div className="flex flex-col">
                  <label htmlFor="subject" className="mb-1 text-lg font-bold  text-gray-200">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject')}
                    placeholder="Asunto"
                    className="px-4 py-2 border rounded-lg bg-gray-700 text-gray-300 border-gray-600 focus:outline-none focus:ring-gray-600 focus:border-gray-600"
                    onChange={(e) =>
                      setSubjectAndGroup({
                        ...subjectAndGroup,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="group" className="mb-1 text-lg font-bold text-gray-200">
                    Grupo
                  </label>
                  <select
                    {...register('group')}
                    className="px-4 py-2 border rounded-lg bg-gray-700 text-gray-300 border-gray-600 focus:outline-none focus:ring-gray-600 focus:border-gray-600"
                    onChange={(e) =>
                      setSubjectAndGroup({
                        ...subjectAndGroup,
                        group: e.target.value,
                      })
                    }
                  >
                    <option value="SOLO KEVIN">SOLO KEVIN</option>
                    <option value="Todos los Becarios">Todos los Becarios</option>
                    <option value="Becarios I">Becarios I</option>
                    <option value="Becarios II">Becarios II</option>
                    <option value="Becarios III">Becarios III</option>
                    <option value="Becarios IV">Becarios IV</option>
                    <option value="Becarios V">Becarios V</option>
                    <option value="Becarios V+">Becarios V+</option>
                  </select>
                </div>
                <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0 mt-4">
                  <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                    <button
                      onClick={showModal}
                      type="button"
                      className="py-2 px-4 w-full text-sm font-medium  rounded-lg border  sm:w-auto focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                    >
                      Cancelar
                    </button>{' '}
                    <button
                      type="submit"
                      className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-green-500 sm:w-auto hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : loading === 'sending' ? (
            <div className="flex flex-col justify-center items-center">
              <h3 className="mb-3 text-sm opacity-50 font-bold  text-white">Enviando talleres</h3>
              <div className="">
                <svg
                  className="animate-spin h-20 w-20 text-green-500 transition-all duration-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center transition-all duration-500">
              <h3 className="mb-3 text-sm opacity-50 font-bold  text-white">
                Talleres enviados de forma correcta
              </h3>
              <CheckIcon color="" />
              <button
                onClick={showModal}
                type="button"
                className="py-2 px-4 w-full text-sm font-medium  rounded-lg border sm:w-auto focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
