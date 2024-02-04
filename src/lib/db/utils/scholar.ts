export const getScholarcountByGender = async () => {
    const [womenScholars, menScholars] = await prisma.$transaction([
        prisma.scholar.count({
            where: {
                gender: 'F',
                program_information: { scholar_condition: 'ACTIVE', chapter_id: 'Rokk6_XCAJAg45heOEzYb' },
            },
        }),
        prisma.scholar.count({
            where: {
                gender: 'M',
                program_information: { scholar_condition: 'ACTIVE', chapter_id: 'Rokk6_XCAJAg45heOEzYb' },
            },
        }),
    ]);
    return [womenScholars, menScholars];
};