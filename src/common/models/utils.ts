export type JSONScalar =
  | number
  | string
  | boolean
  | { [x: string]: JSONScalar }
  | JSONArray
  | null;
export type JSONLike<T = JSONScalar> = { [key: string]: T };

export type JSONArray = Array<JSONScalar | JSONLike | JSONArray>;
