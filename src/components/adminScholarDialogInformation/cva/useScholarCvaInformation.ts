import { getBlobFile } from "@/lib/azure/azure";
import { SchollarCvaInformationWithModules } from "@/lib/db/types";
import { getScholarCvaInformation } from "@/lib/db/utils/cva";
import { useEffect, useState } from 'react';

export const useCvaInformation = (scholarId: string) => {
    const [loading, setLoading] = useState(true);

    const [cvaInformation, setCvaInformation] = useState<SchollarCvaInformationWithModules | null>(null);
    const [cvaFinishedCertificate, setCvaFinishCertificate] = useState<string | null>(null);
    const [modulesFiles, setModulesFiles] = useState<(string | null)[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const collageInformation = await getScholarCvaInformation(scholarId)
            if (!collageInformation) {
                setLoading(false);
                return;
            }
            setCvaInformation(collageInformation);
            const cva_FinishCertificate = await getBlobFile(collageInformation.certificate);
            const modulesFiles = await Promise.all(collageInformation.modules.map(module => getBlobFile(module.record)));
            setLoading(false);
            setModulesFiles(modulesFiles);
            setCvaFinishCertificate(cva_FinishCertificate);
        };

        fetchFiles();
    }, [scholarId]);

    return { loading, cvaInformation, cvaFinishedCertificate, modulesFiles };
};