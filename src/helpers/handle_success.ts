import { RouterContext, Status } from "../deps.ts";
import { handleResponse } from "./handle_response.ts";

enum SuccessStatusList {
  OK = 200,
  Created = 201,
  NoContent = 204,
}
type SuccessStatus = 200 | 201 | 204;

type SuccessResponseParams = {
  status: SuccessStatus;
  data: any;
};
function handleSuccess(
  ctx: RouterContext<string>,
  success: SuccessResponseParams,
) {
  handleResponse(ctx, {
    status: success.status,
    body: success.data,
  });
}

export { handleSuccess, SuccessStatusList };
