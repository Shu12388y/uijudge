export function Response(message, statuscode, data = "") {
  return {
    message: message,
    statuscode: statuscode,
    data: data,
  };
}
