'use client';
import { Button, useDisclosure } from "@nextui-org/react";
import BasicModal from "../BasicModal";
import Collage from "./collage";

const AdminScholarDialogsButtons: React.FC = ({ collage }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} radius="sm">Información universitaria</Button>
            <BasicModal
                size="2xl"
                isOpen={isOpen}
                scroll={true}
                onOpenChange={onOpenChange}
                title="Información universitaria"
                Content={() => (
                    <Collage {...collage} />
                )}
                isButtonDisabled={false}
                onConfirm={async () => (console.log(''))}
                confirmText="Agregar becario"
            />
        </>
    )
}

export default AdminScholarDialogsButtons;