import { PrismaClient } from 'prisma/prisma-client';

declare global {
    var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = db
}

console.log("=== Conectando no banco ===");


export default db;