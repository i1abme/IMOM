export type EmptyData<T> = {
  [P in keyof T]?: T[P] | null;
};
