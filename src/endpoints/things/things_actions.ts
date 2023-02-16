import { DB } from "../../db.ts";
import type { DBTypes } from "../../deps.ts";
import { __DEV__ } from "../../config.ts";
import { ServerError } from "../../helpers/handle_error.ts";

const TABLE = DB?.thing;

// Create
async function create(thing: DBTypes.ThingCreateInput) {
  const fnName = "thing.create";
  if (!TABLE) {
    throw new ServerError("Table not found", { cause: fnName });
  }

  __DEV__ && console.log(`${fnName} params:`, thing);

  try {
    const payload = {
      name: thing.name,
      description: thing.description,
    };

    const response = await TABLE.create({
      data: payload,
    });
    __DEV__ && console.log(`${fnName}d:`, response);

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Update
async function update(
  thingId: DBTypes.ThingWhereUniqueInput["id"],
  thing: DBTypes.ThingUpdateInput,
) {
  const fnName = "thing.update";
  if (!TABLE) {
    throw new ServerError("Table not found", { cause: fnName });
  }
  __DEV__ && console.log(`${fnName} params:`, thingId, thing);

  try {
    const payload = {
      name: thing.name,
      description: thing.description,
    };

    const response = await TABLE.update({
      where: {
        id: thingId,
      },
      data: payload,
    });
    __DEV__ && console.log(`${fnName}`, response);

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Remove
async function remove(thingId: DBTypes.ThingWhereUniqueInput["id"]) {
  const fnName = "thing.remove";
  if (!TABLE) {
    throw new ServerError("Table not found", { cause: fnName });
  }

  try {
    const response = await TABLE.delete({
      where: {
        id: thingId,
      },
    });
    __DEV__ && console.log(`${fnName}`, response);

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Get all
async function getAll() {
  const fnName = "thing.getAll";
  if (!TABLE) {
    throw new ServerError("Table not found", { cause: fnName });
  }

  try {
    const response = await TABLE.findMany();
    __DEV__ && console.log(`${fnName}`, response);

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Get by ID
async function get(thingId: DBTypes.ThingWhereUniqueInput["id"]) {
  const fnName = "thing.get";
  if (!TABLE) {
    throw new ServerError("Table not found", { cause: fnName });
  }

  try {
    const response = await TABLE.findUnique({
      where: {
        id: thingId,
      },
    });
    __DEV__ && console.log(`${fnName}`, response);

    if (!response) {
      throw new Error(`thing not found`);
    }

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

export { create, get, getAll, remove, update };
