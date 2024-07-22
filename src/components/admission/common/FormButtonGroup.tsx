'use client';
import { Button } from '@nextui-org/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FormButtonGroup = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentStep = parseInt((searchParams.get('paso') as string) || '0', 10);

  const navigateToStep = (step: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('paso', step.toString());
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {/* If the current step is the first one, don't show the previous button */}
      {currentStep === 0 ? (
        <div />
      ) : (
        <Button radius="sm" onClick={() => navigateToStep(currentStep - 1)}>
          Anterior
        </Button>
      )}
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault(); // Prevent form submission
          navigateToStep(currentStep + 1);
        }}
        radius="sm"
        color="success"
        className="!text-white"
      >
        Siguiente
      </Button>
    </div>
  );
};

export default FormButtonGroup;
