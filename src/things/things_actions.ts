// Actions for Things
import * as console from "../helpers/console_log.ts";
import { Things } from "./things.ts";
import type { Thing } from "./things.d.ts";
import { __DEV__ } from "../config.ts";

// Create
async function create(thing: Thing) {
  const fnName = "thing.create";

  __DEV__ && console.log(`${fnName} params:`, thing);

  // Sanity check for required fields
  if (!thing.name) {
    throw new Error(`${fnName}: name is required`);
  }

  try {
    const payload = {
      name: thing.name,
    };

    const response = await Things.create(payload);
    if (response?.affectedRows === 0) {
      throw new Error(`thing not created`);
    }
    const newthing = await Things.find(response.lastInsertId as string);
    __DEV__ && console.log(`${fnName}d:`, newthing);

    return newthing;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Update
async function update(thing: Thing) {
  const fnName = "thing.update";

  __DEV__ && console.log(`${fnName} params:`, thing);

  // Sanity check for required fields
  if (!thing.id) {
    throw new Error(`${fnName}: ID is required`);
  }
  if (!thing.name) {
    throw new Error(`${fnName}: name is required`);
  }

  try {
    const payload = {
      name: thing.name,
    };

    const response = await Things.where("id", thing.id as string).update({
      ...payload,
    });
    // @ts-ignore: bad defined type on db connector
    if (response?.affectedRows === 0) {
      throw new Error(`thing not found`);
    }

    const updatedthing = await Things.find(thing.id as string);
    __DEV__ && console.log(`${fnName}d`, updatedthing);

    return updatedthing;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Remove
async function remove(thingId: Thing["id"]) {
  const fnName = "thing.remove";

  // Sanity check for required fields
  if (!thingId) {
    throw new Error(`${fnName}: ID is required`);
  }

  try {
    const response = await Things.deleteById(thingId);
    __DEV__ && console.log(`${fnName}`, response);

    // @ts-ignore: bad defined type on db connector
    if (response?.affectedRows === 0) {
      throw new Error(`thing not found`);
    }

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Get all
async function getAll() {
  const fnName = "thing.getAll";
  try {
    const response = await Things.all();
    __DEV__ && console.log(`${fnName}`, response);

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Get by ID
async function get(thingId: Thing["id"]) {
  const fnName = "thing.get";
  try {
    const response = await Things.find(thingId as string);
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
