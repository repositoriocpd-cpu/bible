// import { PrismaClient } from '@prisma/client'; // Top level import crashes if module is broken

const globalForPrisma = global as unknown as { prisma: any };

export let prisma: any;

try {
    const { PrismaClient } = require('@prisma/client');
    prisma =
        globalForPrisma.prisma ||
        new PrismaClient({
            log: ['query'],
        });
} catch (e) {
    console.error("Failed to initialize Prisma Client. Using Mock.", e);
    prisma = {
        analysis: {
            create: async () => ({}),
            findMany: async () => [],
            findFirst: async () => null,
        },
        $connect: async () => { },
        $disconnect: async () => { },
    };
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
