import { ErrorList, ErrorResult } from "@shared";
import { first, identity } from "lodash";

export type Validator<TValue, TError extends ErrorList> = (
  value: TValue
) => ErrorResult<TError> | null;

export const validate = <TValue, TError extends ErrorList>(
  validators: Validator<TValue, TError>[],
  value: TValue
): ErrorResult<TError> | null => {
  return first(
    validators.map((validator) => validator(value)).filter(identity)
  );
};
