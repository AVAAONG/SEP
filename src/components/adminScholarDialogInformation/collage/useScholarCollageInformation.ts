import { getBlobFile } from "@/lib/azure/azure";
import { SchollarCollageInformationWithCollagePeriod } from "@/lib/db/types";
import { getScholarCollageInformation } from "@/lib/db/utils/collage";
import { useEffect, useState } from 'react';

export const useCollageInformation = (scholarId: string) => {
    const [loading, setLoading] = useState(true);
    const [collageInformation, setCollageInformation] = useState<SchollarCollageInformationWithCollagePeriod | null>(null);
    const [inscriptionProof, setInscriptionProof] = useState<string | null>(null);
    const [schedule, setSchedule] = useState<string | null>(null);
    const [records, setRecords] = useState<(string | null)[]>([]);


    useEffect(() => {
        const fetchFiles = async () => {
            const collageInformation = await getScholarCollageInformation(scholarId)
            if (!collageInformation) {
                setLoading(false);
                return;
            }
            setCollageInformation(collageInformation);
            const inscriptionProofFile = await getBlobFile(collageInformation.collage_study_proof);
            const scheduleFile = await getBlobFile(collageInformation.career_schedule);
            const recordFiles = await Promise.all(collageInformation.collage_period.map(period => getBlobFile(period.record)));
            setInscriptionProof(inscriptionProofFile);
            setSchedule(scheduleFile);
            setRecords(recordFiles);
            setLoading(false);
        };

        fetchFiles();
    }, [scholarId]);

    return { loading, collageInformation, inscriptionProof, schedule, records };
};