export enum GeneralHttpCode {
  GET_OK = 200,
  INTERNAL_ERROR = 500,
}

export type AptiveResponse<T> = {
  status: GeneralHttpCode;
  data: T;
};
