import type { RouterContext } from "../deps.ts";
import type { Thing } from "./things.d.ts";

import { DataTypes, Model } from "../deps.ts";
import { DB } from "../db.ts";
import { ApiRouter } from "../router.ts";
import { API_URL } from "../config.ts";
import { handleError } from "../helpers/handle_error.ts";
import * as Actions from "./things_actions.ts";

// ###########
// DATA MODEL
// ###########
class Things extends Model {
  static table = "things";

  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  };
}
// LINK WITH DB
DB.link([Things]);
// SYNC DB
DB.sync();

// ###########
// ROUTES
// ###########
const ENDPOINT_URL = `${API_URL}/things`;

// Create Thing
ApiRouter.post(`${ENDPOINT_URL}`, async (ctx: RouterContext<string>) => {
  try {
    // const { request, response, state } = ctx
    const body = ctx.request.body();
    // TODO: Handle body type
    // TODO: Validate body
    const thingParams = await body.value as Thing;
    const thing = await Actions.create(thingParams);
    ctx.response.body = {
      status: "success",
      message: `Thing created: ${thing.id}`,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Update Thing
ApiRouter.put(`${ENDPOINT_URL}/:id`, async (ctx: RouterContext<string>) => {
  try {
    const thingId = ctx.params.id as string;
    if (thingId === undefined) throw new Error("thingId is required");
    const body = ctx.request.body();
    // TODO: Handle body type
    // TODO: Validate body
    const thingParams = await body.value as Omit<Thing, "id">;
    const thing = await Actions.update({
      id: thingId,
      ...thingParams,
    });
    ctx.response.body = {
      status: "success",
      message: `Thing updated: ${thingId}`,
      data: thing,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Delete Thing
ApiRouter.delete(`${ENDPOINT_URL}/:id`, async (ctx: RouterContext<string>) => {
  try {
    const thingId = ctx.params.id as string;
    if (thingId === undefined) throw new Error("thingId is required");
    // remove thing
    await Actions.remove(thingId);

    ctx.response.body = {
      status: "success",
      message: `Thing removed: ${thingId}`,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Get all Thigns
ApiRouter.get(`${ENDPOINT_URL}`, async (ctx: RouterContext<string>) => {
  try {
    const things = await Actions.getAll();
    ctx.response.body = {
      status: "success",
      data: things,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Get Thing by ID
ApiRouter.get(`${ENDPOINT_URL}/:id`, async (ctx: RouterContext<string>) => {
  try {
    const thingId = ctx.params.id as string;
    if (thingId === undefined) throw new Error("thingId is required");

    const thing = await Actions.get(thingId);
    ctx.response.body = {
      status: "success",
      data: thing,
    };
  } catch (error) {
    const solvedError = handleError(error);

    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

export { Things };
