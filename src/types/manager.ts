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

export interface OrderInfoData extends OrderCount {
  orderNumberList: string[];
  orderDate: string;
  reserveUser: string;
  packageName: string;
  productCode: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  payedPrice: number;
  balance: number;
  travelerInfos: TravelerInfoData[];
  birth?: string;
  email?: string;
  gender?: string;
  orderState?: string;
  phoneNumber?: string;
  fluctuationInfos?: FluctuationInfos[];
}

export interface FluctuationInfos {
  changedPrice: number;
  memo: string;
  payedPrice: number;
  totalPriceSnapshot: number;
  balanceSnapshot: number;
  updateDate: string;
}

export interface TravelerInfoData {
  travelerName: string;
  enFirstName: string;
  enLastName: string;
  gender: string;
  birth: string;
  phoneNumber: string | null;
  representative: boolean;
}

export interface SpecialAmountData {
  imomOrderId: string;
  additionalPrice: number;
  memo: string;
}

export interface OrderCount {
  imomOrderId: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  totalCount: number;
}

export interface UpdateTravelerReq extends OrderCount {
  travelerInfoList: TravelerInfoData[];
}
