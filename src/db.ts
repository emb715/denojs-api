import { Prisma, PrismaClient } from "./deps.ts";
import { DATABASE_URL } from "./config.ts";

const connect = () => {
  try {
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
    return prisma;
  } catch (error) {
    console.error("DB Error", error);
  }
};

const DB = connect();

export { DB };
