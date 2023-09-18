interface ButtonProps {
  buttonText: string;
}

const Button = ({ buttonText }: ButtonProps) => {
  return (
    <button
      name="button"
      type="submit"
      className="border-2 bg-primary-light text-white font-medium py-2 px-3 rounded-md w-full flex justify-center gap-4 transition-transform duration-75 transform hover:scale-105 "
    >
      {buttonText}
    </button>
  );
};

export default Button;
