import BasicModal from '@/components/BasicModal';

const CalendarActivityInfoDialog = ({ isOpen, onOpenChange, activity }) => {
  const { title } = activity;
  return (
    <BasicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      link=""
      title=""
      Content={() => (
        <div className="flex flex-col gap-2 px-4">
          <div className="flex gap-2">
            <p className="font-bold">Fecha:</p>
            <p>
              <DisplayDate date={selectedEvent?.start} />
            </p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold">Horario:</p>
            <p>
              de <DisplayTime time={selectedEvent.start} /> hasta las{' '}
              <DisplayTime time={selectedEvent.end} />
            </p>
          </div>

          <div>
            <p className="font-bold">
              {selectedEvent.speakerIds.length > 1 ? 'Facilitadores' : 'Facilitador'}
            </p>
            <SpeakersColumnWidget
              speakerIds={selectedEvent.speakerIds}
              speakerImages={selectedEvent.speakerImages}
              speakerNames={selectedEvent.speakerNames}
              speakersCompany={selectedEvent.speakersCompany}
              speakerKind={selectedEvent.speakerKind}
            />
          </div>
          <div className="flex gap-1">
            <p className="font-bold">Modalidad:</p>
            <p>{selectedEvent.modality}</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold">
              {selectedEvent.modality === 'ONLINE' ? 'Plataforma' : 'Lugar'}
            </p>
            <span className="inline">{selectedEvent.platform}</span>
          </div>

          {selectedEvent.level && (
            <div className="flex gap-1">
              <p className="font-bold">Nivel</p>
              <span className="inline">{selectedEvent.level}</span>
            </div>
          )}
          {selectedEvent.skill && (
            <>
              <div className="flex gap-1">
                <p className="font-bold">Competencia:</p>
                <p>{selectedEvent.skill}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Año:</p>
                <p>{selectedEvent.year}</p>
              </div>
            </>
          )}
          <div className="flex gap-1">
            <p className="font-bold">Cupos disponibles:</p>
            <p>{selectedEvent.avalibleSpots}</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold">Cupos ocupados:</p>
            <p>{selectedEvent.enrolledScholars}</p>
          </div>
          <p>{selectedEvent?.description}</p>
        </div>
      )}
      isButtonDisabled={isDisabled()}
      onConfirm={async () => confirmationModal.onOpen()}
      confirmText={selectedEvent?.isFull ? 'Cupos agotados' : 'Inscribirse'}
    />
  );
};

export default CalendarActivityInfoDialog;
