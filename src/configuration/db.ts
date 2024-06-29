// db connections
// connect to prisma / drizzle

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
