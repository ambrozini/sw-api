type ErrorList = readonly string[];

export interface Success<T> {
  success: true;
  data: T;
}

export interface Error<T extends ErrorList> {
  success: false;
  error: T[number];
}

export type ActionResult<TData, TError extends ErrorList> =
  | Success<TData>
  | Error<TError>;

export const isActionResultSuccessful = <TResult, TError extends ErrorList>(
  result: ActionResult<TResult, TError>
): result is Success<TResult> => {
  return result.success;
};

export const isActionResultFailure = <TResult, TError extends ErrorList>(
  result: ActionResult<TResult, TError>
): result is Error<TError> => {
  return !result.success;
};

export const successAction = <T>(data: T = null): Success<T> => ({
  success: true,
  data,
});

export const errorAction = <T extends readonly string[]>(
  error: T[number]
): Error<T> => ({
  success: false,
  error,
});
