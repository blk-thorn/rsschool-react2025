export type ConsoleError = {
  (...data: []): void;
  (message?: string, ...optionalParams: []): void;
}
