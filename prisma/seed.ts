import { Prisma, PrismaClient } from "../generated/client/deno/edge.ts";
import { DATABASE_URL } from "../src/config.ts";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

const thingsData: Prisma.ThingCreateInput[] = [
  {
    name: "Aardonyx",
    description: "An early stage in the evolution of sauropods.",
  },
  {
    name: "Abelisaurus",
    description: "Abel's lizard has been reconstructed from a single skull.",
  },
  {
    name: "Acanthopholis",
    description: "No, it's not a city in Greece.",
  },
];

/**
 * Seed the database.
 */

for (const u of thingsData) {
  const thing = await prisma.thing.create({
    data: u,
  });
  console.log(`Created thing with id: ${thing.id}`);
}
console.log(`Seeding finished.`);

await prisma.$disconnect();
