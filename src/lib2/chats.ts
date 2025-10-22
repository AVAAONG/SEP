import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { prisma } from "@/lib/db/utils/prisma";

export const getChatsByScholar = async (
    scholarId: string,
    options?: {
        startDate?: string;
        endDate?: string;
        year?: number;
        month?: number;
        quarter?: number;
        preset?: string;
    }
): Promise<ChatsWithAllData[]> => {
    // First, fetch only the ids of chats related to this scholar
    const scholarChatIdsResult = await prisma.chat.findMany({
        where: {
            OR: [
                {
                    scholar_attendance: {
                        some: {
                            scholar: {
                                scholarId: scholarId,
                            },
                        },
                    },
                },
                {
                    speaker: {
                        some: {
                            id: scholarId,
                        },
                    },
                },
            ],
        },
        select: { id: true },
    });

    const scholarChatIds = scholarChatIdsResult.map((r) => r.id);

    // If no filtering options provided, default to current year
    if (!options) {
        options = { year: new Date().getFullYear() };
    }

    // If preset=all, return all scholar chats
    if (options.preset === 'all') {
        return prisma.chat.findMany({
            where: { id: { in: scholarChatIds } },
            include: {
                speaker: true,
                scholar_attendance: {
                    where: { scholar: { scholarId: scholarId } },
                },
            },
        }) as Promise<ChatsWithAllData[]>;
    }

    // If options were provided but no date-related fields exist, default to current year
    const hasDateFilter = !!(
        options.startDate ||
        options.endDate ||
        options.year !== undefined ||
        options.month !== undefined ||
        options.quarter !== undefined
    );
    if (!hasDateFilter && options.preset !== 'all') {
        options.year = new Date().getFullYear();
    }

    // Helper to build a date range from year/quarter/month
    const buildRangeFromOptions = (opts: typeof options) => {
        if (opts.startDate && opts.endDate) return { start: new Date(opts.startDate), end: new Date(opts.endDate) };

        // yo eliminaria estas lineas que estan aqui abajo
        if (opts.year) {
            const year = opts.year;
            if (opts.month !== undefined) {
                const start = new Date(year, opts.month, 1);
                const end = new Date(year, opts.month + 1, 0);
                return { start, end };
            }
            if (opts.quarter) {
                const q = opts.quarter; // 1..4
                const startMonth = (q - 1) * 3;
                const start = new Date(year, startMonth, 1);
                const end = new Date(year, startMonth + 3, 0);
                return { start, end };
            }
            // whole year
            return { start: new Date(year, 0, 1), end: new Date(year, 11, 31) };
        }
        return null;
    };

    const range = buildRangeFromOptions(options);
    // If we have a date range, query DB to find matching chat ids using unnest on start_dates
    if (range) {
        const startIso = range.start.toISOString();
        const endIso = range.end;
        // make end inclusive to end of day
        endIso.setHours(23, 59, 59, 999);
        const endIsoStr = endIso.toISOString();

        // If no scholar chat ids, short-circuit
        if (scholarChatIds.length === 0) return [] as ChatsWithAllData[];

        // Raw SQL: unnest start_dates and check between range for chats in scholarChatIds
        const rows: Array<{ id: string }> = (await prisma.$queryRaw`
      SELECT DISTINCT c.id
      FROM "Chat" c, unnest(c.start_dates) sd
      WHERE c.id = ANY(${scholarChatIds})
        AND sd::timestamp BETWEEN ${startIso}::timestamp AND ${endIsoStr}::timestamp
    `) as Array<{ id: string }>;

        const matchedIds = rows.map((r) => r.id);
        if (matchedIds.length === 0) return [] as ChatsWithAllData[];

        return prisma.chat.findMany({
            where: { id: { in: matchedIds } },
            include: {
                speaker: true,
                scholar_attendance: {
                    where: { scholar: { scholarId: scholarId } },
                },
            },
        }) as Promise<ChatsWithAllData[]>;
    }

    // No date-related filters found, return scholar chats
    return prisma.chat.findMany({
        where: { id: { in: scholarChatIds } },
        include: {
            speaker: true,
            scholar_attendance: {
                where: { scholar: { scholarId: scholarId } },
            },
        },
    }) as Promise<ChatsWithAllData[]>;

};