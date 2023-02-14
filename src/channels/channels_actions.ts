// Actions for Channels
import * as console from "../helpers/console_log.ts";
import { Channels } from "./channels.mod.ts";
import type { Channel } from "./channel.d.ts";
import { __DEV__ } from "../config.ts";

// Create
async function create(channel: Channel) {
  const fnName = "channel.create";

  __DEV__ && console.log(`${fnName} params:`, channel);

  // Sanity check for required fields
  if (!channel.name) {
    throw new Error(`${fnName}: name is required`);
  }
  if (!channel.streamUrl) {
    throw new Error(`${fnName}: streamUrl is required`);
  }
  if (!channel.streamAuth.type) {
    throw new Error(`${fnName}: streamAuth.type is required`);
  }
  if (!channel.streamAuth.key) {
    throw new Error(`${fnName}: streamAuth.key is required`);
  }

  try {
    const payload = {
      name: channel.name,
      streamUrl: channel.streamUrl,
      streamAuthType: channel.streamAuth.type,
      streamAuthKey: channel.streamAuth.key,
    };

    const response = await Channels.create(payload);
    if (response?.affectedRows === 0) {
      throw new Error(`Channel not created`);
    }
    const newChannel = await Channels.find(response.lastInsertId as string);
    __DEV__ && console.log(`${fnName}d:`, newChannel);

    return newChannel;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Update
async function update(channel: Channel) {
  const fnName = "channel.update";

  __DEV__ && console.log(`${fnName} params:`, channel);

  // Sanity check for required fields
  if (!channel.id) {
    throw new Error(`${fnName}: ID is required`);
  }
  if (!channel.name) {
    throw new Error(`${fnName}: name is required`);
  }
  if (!channel.streamUrl) {
    throw new Error(`${fnName}: streamUrl is required`);
  }
  if (!channel.streamAuth.type) {
    throw new Error(`${fnName}: streamAuth.type is required`);
  }
  if (!channel.streamAuth.key) {
    throw new Error(`${fnName}: streamAuth.key is required`);
  }

  try {
    const payload = {
      name: channel.name,
      streamUrl: channel.streamUrl,
      streamAuthType: channel.streamAuth.type,
      streamAuthKey: channel.streamAuth.key,
    };

    const response = await Channels.where("id", channel.id as string).update({
      ...payload,
    });

    if (response?.affectedRows === 0) {
      throw new Error(`Channel not found`);
    }

    const updatedChannel = await Channels.find(channel.id as string);
    __DEV__ && console.log(`${fnName}d`, updatedChannel);

    return updatedChannel;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Remove
async function remove(channelId: Channel["id"]) {
  const fnName = "channel.remove";

  // Sanity check for required fields
  if (!channelId) {
    throw new Error(`${fnName}: ID is required`);
  }

  try {
    const response = await Channels.deleteById(channelId);
    __DEV__ && console.log(`${fnName}`, response);

    if (response?.affectedRows === 0) {
      throw new Error(`Channel not found`);
    }

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Get all
async function getAll() {
  const fnName = "channel.getAll";
  try {
    const response = await Channels.all();
    __DEV__ && console.log(`${fnName}`, response);

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

// Get by ID
async function get(channelId: Channel["id"]) {
  const fnName = "channel.get";
  try {
    const response = await Channels.find(channelId as string);
    __DEV__ && console.log(`${fnName}`, response);

    if (!response) {
      throw new Error(`Channel not found`);
    }

    return response;
  } catch (error) {
    const err = error?.message || error;
    throw new Error(`${fnName}: ${err}`);
  }
}

export { create, get, getAll, remove, update };
