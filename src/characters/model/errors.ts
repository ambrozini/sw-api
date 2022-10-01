export const CHARACTER_SERVICE_ERRORS = [
  "ALREADY_EXISTS",
  "VALIDATION_ERROR",
  "NOT_EXISTS",
] as const;

export type CharacterServiceErrors = typeof CHARACTER_SERVICE_ERRORS;
