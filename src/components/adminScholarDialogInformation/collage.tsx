'use client';
import { getBlobFile } from "@/lib/azure/azure";
import { getCollageName, parseEvaluationScaleFromDatabase, parseKindOfCollageFromDatabase, parseStudiRegimeFromDatabase, parseStudyAreaFromDatabase } from "@/lib/utils/parseFromDatabase";
import { parseModalityFromDatabase } from "@/lib/utils2";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Link } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import DisplayDate from "../DisplayDate";

const schollarCollageInformationWithCollagePeriod = Prisma.validator<Prisma.ScholarCollageInformationDefaultArgs>()({
    include: {
        collage_period: true,
    },
});

export type SchollarCollageInformationWithCollagePeriod = Prisma.ScholarCollageInformationGetPayload<typeof schollarCollageInformationWithCollagePeriod>;

const Collage: React.FC<SchollarCollageInformationWithCollagePeriod> = ({
    collage_start_date,
    collage_end_date,
    kind_of_collage,
    collage,
    career,
    mention,
    study_area,
    academic_load_completed,
    study_regime,
    evaluation_scale,
    collage_study_proof,
    career_schedule,
    collage_period

}) => {
    const [inscriptionProof, setInscriptionProof] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [records, setRecords] = useState({});

    useEffect(() => {
        getBlobFile(collage_study_proof).then((file) => {
            setInscriptionProof(file);
        });

        getBlobFile(career_schedule).then((file) => {
            setSchedule(file);
        });

        collage_period.forEach(period => {
            getBlobFile(period.record).then((file) => {
                setRecords(prevRecords => ({ ...prevRecords, [period.record]: file }));
            });
        });
    }, [collage_study_proof, career_schedule, collage_period]);

    return (

        <div className="flex flex-col justify-center items-center gap-4 w-full ">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                <div>
                    <label
                        className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="start-date"
                    >
                        Fecha de inicio
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">
                        <DisplayDate date={collage_start_date?.toISOString()} kind="short" />
                    </p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="type"
                    >
                        Tipo de universidad
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{parseKindOfCollageFromDatabase(kind_of_collage)}</p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="university"
                    >
                        Universidad
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{getCollageName(collage)}</p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="career"
                    >
                        Carrera
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{career}</p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="specialization"
                    >
                        Mención
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{mention}</p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="area"
                    >
                        Area de estudio
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{parseStudyAreaFromDatabase(study_area)}</p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="grading-scale"
                    >
                        Escala de evaluacion
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{parseEvaluationScaleFromDatabase(evaluation_scale)}</p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="study-regime"
                    >
                        Regimen de estudio
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{parseStudiRegimeFromDatabase(study_regime)}</p>
                </div>
                <div>
                    <label
                        className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="completed-load"
                    >
                        ¿Carga academica completa?
                    </label>
                    <p className="mt-1 text-sm  peer-disabled:opacity-100">{academic_load_completed ? 'Sí' : 'No'}</p>
                </div>
                <div></div>
                <Link href={schedule || undefined} className="flex items-center space-x-2" target="_blank">
                    <PaperClipIcon className="h-4 w-4" />
                    <span className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Horario
                    </span>
                </Link >
                <Link href={inscriptionProof || undefined} className="flex items-center space-x-2" target="_blank">
                    <PaperClipIcon className="h-4 w-4" />
                    <span className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Constancia de estudio
                    </span>
                </Link >
            </div>
            <h3 className="texg-lg font-semibold">Periodos academicos</h3>
            {collage_period.map((period, index) => {
                return (
                    <div key={period.record} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <div>
                            <label
                                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="start-date-period"
                            >
                                Fecha de inicio
                            </label>
                            <p className="mt-1 text-sm  peer-disabled:opacity-100">
                                <DisplayDate date={period.start_date?.toISOString()} kind="short" />
                            </p>
                        </div>
                        <div>
                            <label
                                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="end-date-period"
                            >
                                Fecha de cierre
                            </label>
                            <p className="mt-1 text-sm  peer-disabled:opacity-100">
                                <DisplayDate date={period.end_date?.toISOString()} kind="short" />
                            </p>
                        </div>
                        <div>
                            <label
                                className="font-medium leading-none peer-disab  led:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="modality"
                            >
                                Modalidad de clases
                            </label>
                            <p className="mt-1 text-sm  peer-disabled:opacity-100">{parseModalityFromDatabase(period.class_modality)}</p>
                        </div>
                        <div>
                            <label
                                className="font-medium leading-none peer-disab  led:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="modality"
                            >
                                Nota obtenida
                            </label>
                            <p className="mt-1 text-sm  peer-disabled:opacity-100">{period.grade}</p>
                        </div>
                        <Link href={records[index]} className="flex items-center space-x-2">
                            <PaperClipIcon className="h-4 w-4" />
                            <span className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Registro
                            </span>
                        </Link >
                    </div>
                )
            })}
        </div>
    )
}

export default Collage