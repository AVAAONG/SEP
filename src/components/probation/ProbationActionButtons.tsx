import { Button } from '@nextui-org/button';
import { toast } from 'react-toastify';

interface ProbationAccordionProps {
  probationInfo: {
    scholarFirstName: string;
    scholarLastName: string;
    scholarDNI: string;
    starting_date: string;
    ending_date: string;
    kind_of_probation: string;
    done_at_the_moment: {
      chats: number;
      average: number;
      workshops: number;
      internal_volunteering_hours: number;
    };
    agreement: {
      chats: number;
      average: number;
      workshops: number;
      internal_volunteering_hours: number;
    };
  };
  nextMeetingDate: string;
  observations: string;
  endingDate: string;
  isProbationI: boolean;
}

const ProbationActionButtons: React.FC<ProbationAccordionProps> = ({ isProbationI }) => {
  return (
    <>
      <Button
        radius="sm"
        onPress={() =>
          toast.promise(
            createProbationAct(
              scholarInProbation,
              probationInfo,
              formatDate(probationInfo.starting_date)
            ),
            {
              pending: 'Creando acta...',
              success: 'Acta creada',
              error: 'Error al crear acta',
            }
          )
        }
        color={isProbationI ? 'warning' : 'danger'}
        variant="ghost"
      >
        Crear acta
      </Button>
      <Button color={isProbationI ? 'warning' : 'danger'} radius="sm" variant="ghost">
        Borrar
      </Button>
      <Button color={isProbationI ? 'warning' : 'danger'} radius="sm" variant="ghost">
        Editar
      </Button>
      <Button color={isProbationI ? 'warning' : 'danger'} radius="sm" variant="ghost">
        Quitar estatus de probatorio
      </Button>
    </>
  );
};

export default ProbationActionButtons;
