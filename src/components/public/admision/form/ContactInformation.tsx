import AdmisionPersonalInformationSchema from "@/lib/schemas/admision/PersonalInformationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
type Schema = z.infer<typeof AdmisionPersonalInformationSchema>;

const ContactInformation = () => {
    const methods = useForm<Schema>({
        resolver: zodResolver(AdmisionPersonalInformationSchema),
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
        setValue,
    } = methods;

    const handleFormSubmit = async (data: Schema) => {
        console.log(data);
    }
    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Input type="number" isRequired label="Telefono local" />
            <Input type="number" isRequired label="Número telefónico asociado a WhatsApp" />
            <Input type="email" isRequired label="Correo electrónico" />
            <Input
                type="number"
                isRequired
                label="Teléfono de un familiar/pariente/amigo cercano"
                description="En el caso de que no podamos contactarte, ¿con quién podemos comunicarnos?"
            />
            <Input
                type="text"
                isRequired
                label="Nombre del familiar/pariente/amigo cercano"
                description="Especifique el nombre del familiar/pariente/amigo cercano y su relacion con usted"
            />
        </form>
    )
}

export default ContactInformation