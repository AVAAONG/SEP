import shortUUID from "short-uuid";
import { Platform } from "./General";

export type KindOfChat = 'presencial' | 'virtual';

export type ChatLevel = "Basico" | "Intermedio" | "Avanzado";

export type ChatTurn = "A" | "B" | "C";


export interface Chat {
    id: shortUUID.SUUID;
    name: string;
    level: ChatLevel;
    date: string;
    startHour: string;
    endHour: string;
    speaker: string
    numberOfParticipants: number;
    kindOfChat: KindOfChat;
    platform: Platform;
    description: string;
    turn: ChatTurn;
}