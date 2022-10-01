type ErrorList = readonly string[];

export interface SuccessResult<T> {
  success: true;
  data: T;
}

export interface ErrorResult<T extends ErrorList> {
  success: false;
  errorCode: T[number];
  message?: string;
}

export type ActionResult<TData, TError extends ErrorList> =
  | SuccessResult<TData>
  | ErrorResult<TError>;

export const isActionResultSuccessful = <TResult, TError extends ErrorList>(
  result: ActionResult<TResult, TError>
): result is SuccessResult<TResult> => {
  return result.success;
};

export const isActionResultFailure = <TResult, TError extends ErrorList>(
  result: ActionResult<TResult, TError>
): result is ErrorResult<TError> => {
  return !result.success;
};

export const successAction = <T>(data: T = null): SuccessResult<T> => ({
  success: true,
  data,
});

export const errorAction = <T extends readonly string[]>(
  errorCode: T[number],
  message?: string
): ErrorResult<T> => ({
  success: false,
  errorCode,
  message,
});
