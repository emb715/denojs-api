import type { RouterContext } from "../../deps.ts";
import { handleError } from "../../helpers/handle_error.ts";
import {
  handleSuccess,
  SuccessStatusList,
} from "../../helpers/handle_success.ts";
import * as ThingsActions from "./things_actions.ts";
import { schemaParser } from "../../helpers/schema_parser.ts";
import {
  ThingCreateSchema,
  ThingGetUniqueSchema,
  ThingUpdateSchema,
} from "./things_schema.ts";

const createThing = async (ctx: RouterContext<string>) => {
  try {
    const { body: payload } = await schemaParser(ThingCreateSchema, ctx);

    const thing = await ThingsActions.create(payload);

    handleSuccess(ctx, {
      status: SuccessStatusList.Created,
      data: thing,
    });
  } catch (error) {
    handleError(error, ctx);
  }
};

const updateThing = async (ctx: RouterContext<string>) => {
  try {
    const {
      params: {
        id: thingId,
      },
      body: payload,
    } = await schemaParser(ThingUpdateSchema, ctx);

    const thing = await ThingsActions.update(
      thingId,
      payload,
    );

    handleSuccess(ctx, {
      status: SuccessStatusList.OK,
      data: thing,
    });
  } catch (error) {
    handleError(error, ctx);
  }
};

const deleteThing = async (ctx: RouterContext<string>) => {
  try {
    const {
      params: {
        id: thingId,
      },
    } = await schemaParser(ThingUpdateSchema, ctx);

    await ThingsActions.remove(thingId);

    handleSuccess(ctx, {
      status: SuccessStatusList.OK,
      data: null,
    });
  } catch (error) {
    handleError(error, ctx);
  }
};

const uniqueThing = async (ctx: RouterContext<string>) => {
  try {
    const {
      params: {
        id: thingId,
      },
    } = await schemaParser(ThingGetUniqueSchema, ctx);

    const thing = await ThingsActions.get(thingId);

    handleSuccess(ctx, {
      status: SuccessStatusList.OK,
      data: thing,
    });
  } catch (error) {
    handleError(error, ctx);
  }
};

const allThings = async (ctx: RouterContext<string>) => {
  try {
    const things = await ThingsActions.getAll();

    handleSuccess(ctx, {
      status: SuccessStatusList.OK,
      data: things,
    });
  } catch (error) {
    handleError(error, ctx);
  }
};

export { allThings, createThing, deleteThing, uniqueThing, updateThing };
