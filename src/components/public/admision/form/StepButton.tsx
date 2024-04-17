import { Button } from '@nextui-org/react';
import Link from 'next/link';

const StepButton = ({ step }: { step: string }) => {
  return (
    <Button color="success" className="md:col-start-2 text-white ">
      <Link
        className="w-full h-full flex items-center justify-center"
        replace={false}
        href={`?paso=${step}`}
      >
        Siguiente
      </Link>
    </Button>
  );
};

export default StepButton;
