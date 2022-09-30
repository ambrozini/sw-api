export const CHARACTER_SERVICE_ERRORS = [
  "ALREADY_EXISTS",
  "VALIDATION_ERROR",
] as const;

export type CharacterServiceErrors = typeof CHARACTER_SERVICE_ERRORS;
