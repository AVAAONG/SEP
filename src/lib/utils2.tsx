export const parseSkillFromDatabase = (skill: string) => {
  switch (skill.trim()) {
    case 'CITIZEN_EXERCISE':
      return 'Ejercicio Ciudadano';
    case 'ENTREPRENEURSHIP':
      return 'Emprendimiento';
    case 'SELF_MANAGEMENT':
      return 'Gerencia de sí mismo';
    case 'LEADERSHIP':
      return 'Liderazgo';
    case 'ICT':
      return 'TIC';
    default:
      return 'CITIZEN_EXERCISE';
  }
};
