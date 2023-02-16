import { DBTypes, z } from "../../deps.ts";

const ThingCreateSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const ThingUpdateSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "ID is required",
    }),
  }),
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const ThingGetUniqueSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "ID is required",
    }),
  }),
});

export { ThingCreateSchema, ThingGetUniqueSchema, ThingUpdateSchema };
