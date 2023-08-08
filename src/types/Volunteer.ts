import shortUUID from 'short-uuid';

export type AsociatedProject = 'UMAA' | 'OAL' | 'ALV' | 'UVPLV' | 'GA' | 'Oficinas' | 'Externo';

export type kindOfVolunteer = 'Presencial' | 'Virtual';

export interface Volunteer {
  id: shortUUID.SUUID;
  name: string;
  asociatedProject: AsociatedProject;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  inCharge: string;
  numberOfParticipants: number;
  kindOfVolunteer: kindOfVolunteer;
  place: string;
  description: string;
}
