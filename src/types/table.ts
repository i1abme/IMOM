import { ColumnDef } from "@tanstack/react-table";

export type TableProps<T> = {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  tableStyle?: string;
  theadStyle?: string;
  theadTrStyle?: string; // thead 내의 tr 스타일
  thStyle?: string;
  tbodyStyle?: string;
  tbodyTrStyle?: string; // tbody 내의 tr 스타일
  tdStyle?: string;
};
