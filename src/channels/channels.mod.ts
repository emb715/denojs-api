import type { RouterContext } from "../deps.ts";
import type { Channel } from "./channel.d.ts";

import { DataTypes, Model } from "../deps.ts";
import { DB } from "../db.ts";
import { ApiRouter } from "../router.ts";
import { API_URL } from "../config.ts";
import { handleError } from "../helpers/handle_error.ts";
import * as Actions from "./channels_actions.ts";

// ###############################
// DATA MODEL for Channels
// ###############################
class Channels extends Model {
  static table = "channels";

  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    streamUrl: DataTypes.STRING,
    streamAuthType: DataTypes.STRING,
    streamAuthKey: DataTypes.STRING,
  };
}
// LINK WITH DB
DB.link([Channels]);
// SYNC DB
DB.sync();

// ###############################
// ROUTES for Channels
// ###############################
const CHANNELS_URL = `${API_URL}/channels`;

// Create Channel
ApiRouter.post(`${CHANNELS_URL}`, async (ctx: RouterContext<string>) => {
  try {
    // const { request, response, state } = ctx
    const body = ctx.request.body();
    // TODO: Handle body type
    // TODO: Validate body
    const channelParams = await body.value as Channel;
    const channel = await Actions.create(channelParams);
    ctx.response.body = {
      status: "success",
      message: `Channel created: ${channel.id}`,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Update Channel
ApiRouter.put(`${CHANNELS_URL}/:id`, async (ctx: RouterContext<string>) => {
  try {
    const channelId = ctx.params.id as string;
    if (channelId === undefined) throw new Error("channelId is required");
    const body = ctx.request.body();
    // TODO: Handle body type
    // TODO: Validate body
    const channelParams = await body.value as Omit<Channel, "id">;
    const channel = await Actions.update({
      id: channelId,
      ...channelParams,
    });
    ctx.response.body = {
      status: "success",
      message: `Channel updated: ${channelId}`,
      data: channel,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Delete Channel
ApiRouter.delete(`${CHANNELS_URL}/:id`, async (ctx: RouterContext<string>) => {
  try {
    const channelId = ctx.params.id as string;
    if (channelId === undefined) throw new Error("channelId is required");
    // remove channel
    await Actions.remove(channelId);

    ctx.response.body = {
      status: "success",
      message: `Channel removed: ${channelId}`,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Get all Channels
ApiRouter.get(`${CHANNELS_URL}`, async (ctx: RouterContext<string>) => {
  try {
    const channels = await Actions.getAll();
    ctx.response.body = {
      status: "success",
      data: channels,
    };
  } catch (error) {
    const solvedError = handleError(error);
    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

// Get Channel by ID
ApiRouter.get(`${CHANNELS_URL}/:id`, async (ctx: RouterContext<string>) => {
  try {
    const channelId = ctx.params.id as string;
    if (channelId === undefined) throw new Error("channelId is required");

    const channel = await Actions.get(channelId);
    ctx.response.body = {
      status: "success",
      data: channel,
    };
  } catch (error) {
    const solvedError = handleError(error);

    ctx.response.body = {
      status: "failed",
      message: solvedError.message,
    };
  }
});

export { Channels };
