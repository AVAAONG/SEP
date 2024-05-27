'use client';
import DisplayDate from "@/components/DisplayDate";
import { parseCvaLocationFromDatabase } from "@/lib/utils/parseFromDatabase";
import { parseCvaScheduleFromDatabase, parseModalityFromDatabase } from "@/lib/utils2";
import { ArrowPathIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import DetailItem from "../commonComponents/DetailItem";
import LinkItem from "../commonComponents/LinkItem";
import { useCvaInformation } from "./useScholarCvaInformation";

const CVAInformation: React.FC<{ scholarId: string }> = ({ scholarId }) => {
    const { loading, cvaFinishedCertificate, cvaInformation, modulesFiles } = useCvaInformation(scholarId);
    if (loading) return (
        <div className="w-full flex items-center justify-center">
            <ArrowPathIcon className="h-1/4 w-1/4 animate-spin text-primary-light" />
        </div>
    )
    if (!cvaInformation) return null;

    const { already_finished_cva, cva_ended_date, cva_location, cva_started_date, is_in_cva, not_started_cva_reason, modules } = cvaInformation;

    return (

        <div className="flex flex-col justify-center items-center gap-4 w-full ">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                <DetailItem label="¿Se encuentra actualmente en el CVA?" value={is_in_cva ? 'Sí' : 'No'} />
                <DetailItem
                    label="Fecha de inicio"
                    value={cva_started_date ? <DisplayDate date={cva_started_date.toISOString()} kind="short" /> : 'N/A'}
                />
                <DetailItem
                    label="Fecha de finalización"
                    value={cva_ended_date ? <DisplayDate date={cva_ended_date.toISOString()} kind="short" /> : 'N/A'}
                />
                <DetailItem label="Ubicación" value={parseCvaLocationFromDatabase(cva_location)} />
                <DetailItem label="¿Ya finalizó el CVA?" value={already_finished_cva ? 'Sí' : 'No'} />
                <LinkItem href={cvaFinishedCertificate} label="Certificado de finalización" icon={<PaperClipIcon className="h-4 w-4" />} />
                {
                    already_finished_cva ? <></> : <DetailItem label="Razón por la que no ha iniciado" value={not_started_cva_reason} />
                }
            </div>
            <h3 className="texg-lg font-semibold">Periodos academicos</h3>
            {modules.map((module, index) => {
                return (
                    <div key={module.record} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <DetailItem label="Modulo cursado" value={module.module} />
                        <DetailItem label="Modalidad de clases" value={parseModalityFromDatabase(module.modality)} />
                        <DetailItem label="Nota obtenida" value={module.qualification} />
                        <DetailItem label="Horario" value={parseCvaScheduleFromDatabase(module.schedule)} />
                        <LinkItem href={modulesFiles[index]} label="Registro" icon={<PaperClipIcon className="h-4 w-4" />} />
                    </div>
                )
            })}
        </div>
    )
}

export default CVAInformation;