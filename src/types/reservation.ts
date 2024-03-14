import { ReservationInfo } from "./product";

export type PriceInfoData = {
  성인: {
    count: number;
    price: number;
    totalPrice: number;
  };
  아동: {
    count: number;
    price: number;
    totalPrice: number;
  };
  유아: {
    count: number;
    price: number;
    totalPrice: number;
  };
  totalPay: number;
  totalCount: number;
};

export type ReservationBoxProps = {
  prices: {
    age: "성인" | "아동" | "유아";
    price: number;
    surcharge: number;
  }[];
  maxCount: number;
  nowCount: number;
  info: ReservationInfo;
  productState: string;
};

export interface travelerInfo {
  travelerName: string;
  enFirstName: string;
  enLastName: string;
  gender: string;
  birth: string;
  phoneNumber: string;
  representative: boolean;
}

export interface TermsState {
  travel: boolean;
  refund: boolean;
  privacy: boolean;
  identification: boolean;
  thirdperson: boolean;
  marketing: boolean;
}
