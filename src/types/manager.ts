import { Pageable } from "./pageable";

export interface OrderRequest {
  orderDateMin: string | null;
  orderDateMax: string | null;
  packageId: number | null;
  country: string | null;
  orderState: string | null;
  userNameOrder: number | null;
  order: number | null;
  start: number | null;
  type: string;
  target: string;
  offset: number;
}

export interface OrderList {
  imomOrderId: string | null;
  orderDate: string | null;
  orderState: string | null;
  packageName: string | null;
  productCode: string | null;
  startDate: string | null;
  totalCount: number | null;
  productState: string | null;
  reserveUser: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface OrderData extends Pageable {
  content: OrderList[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type ManagerColumns<T> = {
  key: string;
  label: string;
  sortable: boolean;
  render?: (value: T[keyof T] | null) => string | null;
  onClick?: () => void;
}[];
