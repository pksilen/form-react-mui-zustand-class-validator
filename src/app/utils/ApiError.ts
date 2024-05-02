export default class ApiError extends Error {
  constructor(error: Error | object) {
    super(error instanceof Error ? error.message : JSON.stringify(error));
  }
}
