'use client';
import DisplayDate from "@/components/DisplayDate";
import { getCollageName, parseEvaluationScaleFromDatabase, parseKindOfCollageFromDatabase, parseStudiRegimeFromDatabase, parseStudyAreaFromDatabase } from "@/lib/utils/parseFromDatabase";
import { parseModalityFromDatabase } from "@/lib/utils2";
import { ArrowPathIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import DetailItem from "../commonComponents/DetailItem";
import LinkItem from "../commonComponents/LinkItem";
import { useCollageInformation } from "./useScholarCollageInformation";

const CollageInformation: React.FC<{ scholarId: string }> = ({ scholarId }) => {
    const { loading, collageInformation, inscriptionProof, schedule, records } = useCollageInformation(scholarId);

    if (loading) return (
        <div className="w-full flex items-center justify-center">
            <ArrowPathIcon className="h-1/4 w-1/4 animate-spin text-primary-light" />
        </div>
    )
    if (!collageInformation) return null;

    const { collage_start_date, kind_of_collage, collage, career, mention, study_area, evaluation_scale, study_regime, academic_load_completed, collage_period } = collageInformation;

    return (

        <div className="flex flex-col justify-center items-center gap-4 w-full ">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                <DetailItem
                    label="Fecha de inicio"
                    value={collage_start_date ? <DisplayDate date={collage_start_date.toISOString()} kind="short" /> : 'N/A'}
                />
                <DetailItem label="Tipo de universidad" value={parseKindOfCollageFromDatabase(kind_of_collage)} />
                <DetailItem label="Universidad" value={getCollageName(collage)} />
                <DetailItem label="Carrera" value={career} />
                <DetailItem label="Mención" value={mention} />
                <DetailItem label="Area de estudio" value={parseStudyAreaFromDatabase(study_area)} />
                <DetailItem label="Escala de evaluacion" value={parseEvaluationScaleFromDatabase(evaluation_scale)} />
                <DetailItem label="Regimen de estudio" value={parseStudiRegimeFromDatabase(study_regime)} />
                <DetailItem label="¿Carga academica completa?" value={academic_load_completed ? 'Sí' : 'No'} />
                <div></div>
                <LinkItem href={schedule} label="Horario" icon={<PaperClipIcon className="h-4 w-4" />} />
                <LinkItem href={inscriptionProof} label="Constancia de estudio" icon={<PaperClipIcon className="h-4 w-4" />} />
            </div>
            <h3 className="texg-lg font-semibold">Periodos academicos</h3>
            {collage_period.map((period, index) => {
                return (
                    <div key={period.record} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <DetailItem label="Fecha de inicio" value={<DisplayDate date={period.start_date?.toISOString()} kind="short" />} />
                        <DetailItem label="Fecha de cierre" value={<DisplayDate date={period.end_date?.toISOString()} kind="short" />} />
                        <DetailItem label="Modalidad de clases" value={parseModalityFromDatabase(period.class_modality)} />
                        <DetailItem label="Nota obtenida" value={period.grade} />
                        <LinkItem href={records[index]} label="Registro" icon={<PaperClipIcon className="h-4 w-4" />} />
                    </div>
                )
            })}
        </div>
    )
}

export default CollageInformation;