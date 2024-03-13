import { EmptyData } from "../types/fillData";

export const fillData = <T>(
  list: T[],
  length: number,
  emptyData: EmptyData<T>
): T[] => {
  const emptyDataLength = length - list.length;
  const emptyDatas = Array.from(
    { length: emptyDataLength },
    () => emptyData as T
  );
  return [...list, ...emptyDatas];
};
