
import shortUUID from "short-uuid";
import { Platform } from "./General";
import { AvaaYear } from "@prisma/client";

export type Pensum = 'Liderazgo' | 'Ejercicio Ciudadano' | 'Gerencia de si mismo' | 'TICs' | 'Emprendimiento';
export type KindOfWorkshop = 'presencial' | 'virtual' | 'asincrona' | 'hibrida';

export type Workshop = {
    id: shortUUID.SUUID;
    title: string;
    pensum: Pensum;
    date: string;
    startHour: string;
    endHour: string;
    speaker: string
    spots: number;
    modality: KindOfWorkshop;
    platform: Platform;
    description: string;
    workshopYear: AvaaYear[];
}