
import shortUUID from "short-uuid";
import { Platform } from "./General";

export type Pensum = 'Liderazgo' | 'Ejercicio Ciudadano' | 'Gerencia de si mismo' | 'TICs' | 'Emprendimiento';
export type KindOfWorkshop = 'presencial' | 'virtual' | 'asincrona' | 'hibrida';

export type Workshop = {
    id: shortUUID.SUUID;
    name: string;
    pensum: Pensum;
    date: string;
    startHour: string;
    endHour: string;
    speaker: string
    numberOfParticipants: number;
    kindOfWorkshop: KindOfWorkshop;
    platform: Platform;
    description: string;
    avaaYear: string[];
}