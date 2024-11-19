'use client';
import { deleteProbation, endScholarProbation } from '@/lib/db/utils/probation';
import { useConfirmation } from '@/lib/hooks/useConfirmation';
import { createProbationAct } from '@/lib/serverAction';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { Probation, ScholarStatus } from '@prisma/client';
import { toast } from 'react-toastify';
import ProbationForm from '../ProbationForm';

interface ProbationAccordionProps {
  scholarData: {
    id: string;
    status: ScholarStatus;
    firstName: string;
    surNames: string;
    dni: string;
  };
  probation: Probation;
}

const ProbationActionButtons: React.FC<ProbationAccordionProps> = ({ probation, scholarData }) => {
  const { openConfirmation, ConfirmationModal } = useConfirmation();
  const modalActions = useDisclosure();

  const handleDelete = () => {
    openConfirmation(
      {
        title: 'Confirmar eliminacion',
        message:
          '¿Está seguro que desea borrar este estatus de probatorio? Esta acción no se puede deshacer.',
        confirmText: 'Borrar',
        cancelText: 'Cancelar',
      },
      async () =>
        toast.promise(deleteProbation(probation.id, scholarData.id), {
          error: 'Error al eliminar informacion de probatorio',
          pending: 'Eliminando informacion de probatorio',
          success: 'Informacion de probatorio eliminada de forma exitosa',
        })
    );
  };
  const handleEndScholarProbation = () => {
    openConfirmation(
      {
        title: 'Confirmar accion',
        message: '¿Está seguro que desea terminar el estatus de probatorio de este becario?.',
        confirmText: 'Quitar estatus',
        cancelText: 'Cancelar',
      },
      async () =>
        toast.promise(endScholarProbation(probation.id, scholarData.id), {
          error: 'Error al terminar estatus de probatorio',
          pending: 'Terminando estatus de probatorio',
          success: 'Probatorio terminado de forma exitosa',
        })
    );
  };
  return (
    <>
      <Button
        // isDisabled={probation.ending_date !== null}
        radius="sm"
        onPress={() =>
          toast.promise(
            createProbationAct(
              {
                first_names: scholarData.firstName,
                last_names: scholarData.surNames,
                dni: scholarData.dni,
              },
              probation
            ),
            {
              pending: 'Creando acta...',
              success: 'Acta creada',
              error: 'Error al crear acta',
            }
          )
        }
        color={probation.kind_of_probation === 'PROBATION_I' ? 'warning' : 'danger'}
        variant="ghost"
      >
        Crear acta
      </Button>
      <Button
        onPress={handleDelete}
        color={probation.kind_of_probation === 'PROBATION_I' ? 'warning' : 'danger'}
        radius="sm"
        variant="ghost"
      >
        Borrar
      </Button>
      <Button
        onPress={modalActions.onOpen}
        color={probation.kind_of_probation === 'PROBATION_I' ? 'warning' : 'danger'}
        radius="sm"
        variant="ghost"
      >
        Editar
      </Button>
      <Button
        isDisabled={probation.ending_date !== null}
        onPress={handleEndScholarProbation}
        color={probation.kind_of_probation === 'PROBATION_I' ? 'warning' : 'danger'}
        radius="sm"
        variant="ghost"
      >
        Quitar estatus de probatorio
      </Button>
      <ConfirmationModal />
      <ProbationForm
        scholarId={scholarData.id}
        probation={probation}
        formAction={modalActions}
        probationKind={probation.kind_of_probation}
      />
    </>
  );
};

export default ProbationActionButtons;
