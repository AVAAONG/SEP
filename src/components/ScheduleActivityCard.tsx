import Modal from '@/components/commons/ModalV2';
import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  cn,
} from '@nextui-org/react';
import { EditIcon } from 'public/svgs/svgs';
import { useState } from 'react';
import { WorkshopWithSpeaker } from './admin/WorkshopForm';

type WorkshopsListProps = {
  workshops: WorkshopWithSpeaker[];
};

const ScheduledWorkshopsList: React.FC<WorkshopsListProps> = ({ workshops }) => {
  const [groupSelected, setGroupSelected] = useState<string[]>([]);

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="col-span-2 mb-3 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
        Actividades agendadas
      </h1>
      <CheckboxGroup
        label="Selecciona las actividades que deseas enviar"
        value={groupSelected}
        onChange={(value: string[]) => setGroupSelected(value)}
        color="success"
        classNames={{
          label: ' italic text-sm w-full text-center text-primary-1',
          base: 'w-full',
        }}
      >
        {workshops.map((workshop) => {
          const { title, speaker, id, avalible_spots, platform, asociated_skill, year, modality } =
            workshop;
          return (
            <Checkbox
              radius="sm"
              aria-label={title}
              key={id}
              classNames={{
                base: cn(
                  'inline-flex max-w-full w-full bg-content1 m-0',
                  'hover:bg-content2 items-center justify-start',
                  'cursor-pointer rounded-lg gap-2 p-2 px-4 border-2 border-transparent',
                  'data-[selected=true]:border-primary-light'
                ),
                label: 'w-full',
              }}
              value={id}
            >
              <div className="w-full flex justify-between gap-2 items-center">
                <div className="flex-1 w-1/6 overflow-hidden">
                  <Tooltip showArrow={true} content={title}>
                    <Button className="bg-transparent h-unit-4 p-0 m-0 font-medium" variant="flat">
                      {title}
                    </Button>
                  </Tooltip>
                  <p className="text-xs  ">
                    <Tooltip
                      showArrow={true}
                      content={`${speaker[0].first_names + ' ' + speaker[0].last_names}`}
                    >
                      <Button className="bg-transparent p-0 h-unit-4" variant="flat">
                        Por: {speaker[0].first_names + ' ' + speaker[0].last_names} kdsjlakj
                      </Button>
                    </Tooltip>
                  </p>
                </div>
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-sm font-medium ">
                    {new Date().toLocaleString('es-ES', {
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs   ">
                    De{' '}
                    {new Date().toLocaleString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    a{' '}
                    {new Date().toLocaleString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-sm font-medium ">{parseSkillFromDatabase(asociated_skill)}</p>
                  <p className="text-xs">{avalible_spots} cupos</p>
                  <p className="text-xs">{year.toString().replaceAll(',', ', ')} Año</p>
                </div>
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-sm font-medium ">{parseModalityFromDatabase(modality)} </p>
                  <p className="text-xs   ">{platform}</p>
                </div>
                <div className=" flex flex-col w-6">
                  <Button
                    variant="light"
                    color="danger"
                    radius="full"
                    size="sm"
                    isIconOnly
                    className="w-4 font-medium"
                  >
                    X<span className="sr-only">Eliminar taller</span>
                  </Button>
                  <Modal
                    whenNoModal={
                      <div className="w-4">
                        <EditIcon />
                      </div>
                    }
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            ¿Estas seguro que deseas editar este taller?
                          </ModalHeader>
                          <ModalBody>
                            <div className="text-9xl w-full text-center">🤨</div>
                          </ModalBody>
                          <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                              Cerrar
                            </Button>
                            <Button color="danger" onPress={onClose}>
                              Editar
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      <Button
        className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white w-1/2 mt-12"
        radius="sm"
      >
        Enviar
      </Button>
    </div>
  );
};

export default ScheduledWorkshopsList;
