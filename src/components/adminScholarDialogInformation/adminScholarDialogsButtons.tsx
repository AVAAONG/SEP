'use client';
import { Button, useDisclosure } from "@nextui-org/react";
import BasicModal from "../BasicModal";
import CollageInformation from "./collage/CollageInformation";

const AdminScholarDialogsButtons: React.FC<{ scholarId: string }> = ({ scholarId }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} radius="sm">Universidad</Button>
            <Button radius="sm">CVA</Button>
            <BasicModal
                size="2xl"
                isOpen={isOpen}
                scroll={true}
                onOpenChange={onOpenChange}
                title="🎓 Información universitaria"
                Content={() => (
                    <CollageInformation scholarId={scholarId} />
                )}
                isButtonDisabled={false}
                onConfirm={() => { }}
                confirmText=''
            />
        </>
    )
}

export default AdminScholarDialogsButtons;