interface HandleError extends Error {
  message: string;
}

// function notFound(context: Context) {
//   context.response.status = Status.NotFound;
//   context.response.body =
//     `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
// }

function handleError(error: Error): HandleError {
  console.log("handleError", error);
  // if (error.message.includes('name is required')) {
  //   console.log('handleError > name is required')
  // }
  return error;
}

export { handleError };
