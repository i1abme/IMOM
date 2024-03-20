import { Package } from "./package";
import { Pageable } from "./pageable";

export type Product = {
  productId: number;
  productCode: string;
  startDate: string;
  endDate: string;
  minCount: number;
  maxCount: number;
  nowCount: number;
  productState: string;
  airline: string;
  price: number;
  flagCarrier: number;
  tourConductor: number;
  shopping: number;
  optionalTour: number;
  adultPrice: number;
  adultSurcharge: number;
  childPrice: number;
  childSurcharge: number;
  infantPrice: number;
  infantSurcharge: number;
  keyPoint: string;
  includedProduct: string;
  excludedProduct: string;
  reservationNotice: string;
  travelRegion: string;
};

export type ProductDetialInfo = {
  packageInfo: Package;
  productInfo: Product;
};

export interface ProductList {
  productId: number;
  productCode: string;
  startDate: string;
  endDate: string;
  maxCount: number;
  nowCount: number;
  airline: string;
  price: number | string;
  productState: string;
}

export interface Products extends Pageable {
  content: ProductList[];
}

export type ProductListRequest = {
  packageId: number | null;
  offset: number;
  limit: number;
};

export type ProductListInfo = {
  productId: number;
  startDate: string;
  endDate: string;
  airline: string;
  price: number | string;
  productState: string;
  detail: string | JSX.Element;
};

export type SummaryTableProps = {
  productId: string;
  startDate: string;
  endDate: string;
  airline: string;
  minCount: number;
};

export type SummaryTableInfo = {
  id: string;
  startDate: string;
  endDate: string;
  airline: string;
  minCount: number;
};

export type Schedule = {
  scheduleId: number;
  day: number;
  dayContent: string;
  hotel: string;
  meal: string;
  vehicle: string;
};

export type ScheduleListProps = {
  scheduleListData: Schedule[] | null;
};

export type ScheduleItemProps = {
  title?: string;
  content: string;
};

export type Prices = {
  age: "성인" | "아동" | "유아";
  price: number;
  surcharge: number;
};

export type CountBtnProps = {
  age: "성인" | "아동" | "유아";
  price: number;
  onCountChange: (age: "성인" | "아동" | "유아", newCount: number) => void;
  remainCount: number;
  productState: string;
};

export type ReservationInfo = {
  packageName: string;
  period: string;
  startDate: string;
  endDate: string;
  airline: string;
  productId: number;
};

export interface ProductDates {
  productId: number;
  startDate: string;
}

export interface CalendarProductDates {
  [key: number]: Date;
}
