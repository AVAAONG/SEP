'use client';

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-light hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008000]"
    >
      Regresar
    </button>
  );
};

export default BackButton;
