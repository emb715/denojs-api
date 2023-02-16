import { __DEV__ } from "../config.ts";
import { Context, isHttpError, Status, z } from "../deps.ts";
import { errorLogger } from "./error_logger.ts";
import { handleResponse } from "./handle_response.ts";

enum ErrorTypes {
  ZodError = "zodError",
  HttpError = "httpError",
  ServerError = "serverError",
}

class CustomError extends Error {
  _type: ErrorTypes;
  message: string;
  cause?: string;
  status?: ErrorStatusList;
  constructor(
    message: string,
    options: { type: ErrorTypes; cause?: string; status?: ErrorStatusList },
  ) {
    super(message);
    this._type = options.type;
    this.message = message;
    options?.cause && (this.cause = options.cause);
    options?.status && (this.status = options.status);
  }
}

class ServerError extends CustomError {
  constructor(message: string, options?: { cause?: string }) {
    super(message, {
      ...options,
      type: ErrorTypes.ServerError,
    });
  }
}

enum ErrorStatusList {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501,
  ServiceUnavailable = 503,
}

const handleError = (error: CustomError | Error, ctx: Context) => {
  try {
    if (error instanceof z.ZodError) {
      handleResponse(ctx, {
        status: ErrorStatusList.BadRequest,
        body: {
          error: error.issues,
          ...__DEV__ && { ["__DEV__"]: error },
        },
      });
    } else if (error instanceof ServerError) {
      throw error;
    } else if (
      error instanceof CustomError && error._type === ErrorTypes.HttpError
    ) {
      handleResponse(ctx, {
        status: error?.status || ErrorStatusList.BadRequest,
        body: {
          error: error.message,
          ...__DEV__ && { ["__DEV__"]: error },
        },
      });
    } else if (error instanceof Error) {
      handleResponse(ctx, {
        status: ErrorStatusList.NotFound,
        body: {
          error: error.message,
          ...__DEV__ && { ["__DEV__"]: error },
        },
      });
    }
  } catch (err) {
    const message = err?.message || "";
    handleResponse(ctx, {
      status: ErrorStatusList.InternalServerError,
      body: {
        message,
        ...__DEV__ && { ["__DEV__"]: error },
      },
    });
    // Error Log Service
    errorLogger.captureException(error);
  }
};

export { CustomError, ErrorStatusList, ErrorTypes, handleError, ServerError };
