export const parseStudyAreaFromDatabase = (area: string) => {
    switch (area) {
        case 'ARCHITECTURE_URBANISM':
            return 'Arquitectura y Urbanismo';
        case 'HEALTH_SCIENCES':
            return 'Ciencias de la Salud';
        case 'JURIDICAL_POLITICAL_SCIENCES':
            return 'Ciencias Jurídicas y Políticas';
        case 'SOCIAL_SCIENCES':
            return 'Ciencias Sociales';
        case 'HUMANITIES_EDUCATION':
            return 'Humanidades y Educación';
        case 'STEM':
            return 'STEM';
        default:
            return 'OTHER';
    }
};

export const parseAvaaAdmisionYear = (year: number,) => {
    switch (year) {
        case 0:
            return 'I';
        case 1:
            return 'II';
        case 2:
            return 'III';
        case 3:
            return 'IV';
        case 4:
            return 'V';
        case 5:
            return '+V';
        default:
            return '+V';
    }
}